// src/admin/pages/AddProductPage.jsx
import React, { useState } from 'react';
import { supabase } from '../../../api/supabaseClient';

// A small component for a single specification row
const SpecRow = ({ index, spec, handleSpecChange, removeSpecField }) => (
  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
    <input
      type="text"
      placeholder="Label (e.g. Puissance)"
      value={spec.label}
      onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
      className="filter-input"
      style={{ flex: 1 }}
    />
    <input
      type="text"
      placeholder="Value (e.g. 200W)"
      value={spec.value}
      onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
      className="filter-input"
      style={{ flex: 1 }}
    />
    <button type="button" onClick={() => removeSpecField(index)} className="btn btn-inspect" style={{ padding: '8px 12px', minWidth: '40px' }}>X</button>
  </div>
);


const AddProductPage = () => {
  // State for all product fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [tags, setTags] = useState('');
  const [stockStatus, setStockStatus] = useState('En Stock');
  const [soldCount, setSoldCount] = useState(0);
  const [whatsappNumber, setWhatsappNumber] = useState('+213123456789');
  const [specifications, setSpecifications] = useState([{ label: '', value: '' }]);
  const [images, setImages] = useState([]); // Will hold the file objects

  // State for UI feedback
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // --- Handlers for Specifications ---
  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
  };

  const addSpecField = () => {
    setSpecifications([...specifications, { label: '', value: '' }]);
  };

  const removeSpecField = (index) => {
    const newSpecs = specifications.filter((_, i) => i !== index);
    setSpecifications(newSpecs);
  };

  // --- Handler for multiple image selection ---
  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // Store an array of files
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);
    setSuccess(null);

    // 1. UPLOAD ALL IMAGES CONCURRENTLY
    const uploadPromises = images.map(file => {
      const filePath = `public/${Date.now()}_${file.name}`;
      return supabase.storage.from('product-images').upload(filePath, file);
    });

    try {
      const uploadResults = await Promise.all(uploadPromises);
      
      // Check for any upload errors
      const uploadErrors = uploadResults.filter(result => result.error);
      if (uploadErrors.length > 0) {
        throw new Error(`Failed to upload images: ${uploadErrors.map(e => e.error.message).join(', ')}`);
      }
      
      // 2. GET PUBLIC URLS FOR ALL UPLOADED IMAGES
      const imageUrls = uploadResults.map(result => {
        const { data } = supabase.storage.from('product-images').getPublicUrl(result.data.path);
        return data.publicUrl;
      });

      // 3. PREPARE THE DATA FOR INSERTION
      const productData = {
        name,
        description,
        price: parseFloat(price),
        original_price: originalPrice ? parseFloat(originalPrice) : null,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean), // Convert comma-separated string to array
        stock_status: stockStatus,
        sold_count: parseInt(soldCount, 10),
        whatsapp_number: whatsappNumber,
        specifications: specifications.filter(spec => spec.label && spec.value), // Remove empty specs
        image_urls: imageUrls,
      };

      // 4. INSERT THE NEW PRODUCT INTO THE DATABASE
      const { error: insertError } = await supabase.from('products').insert([productData]);

      if (insertError) {
        throw insertError;
      }

      setSuccess('Product added successfully!');
      // Reset form (optional)
      // ...

    } catch (err) {
      console.error('Error:', err.message);
      setError(`Failed to add product: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="store-container" style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <input placeholder="Product Name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="search-input" required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="search-input" rows="4" />
        
        <div style={{display: 'flex', gap: '1rem'}}>
            <input placeholder="Price (DA)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="filter-input" required />
            <input placeholder="Original Price (Optional)" type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="filter-input" />
        </div>

        <input placeholder="Tags (comma-separated, e.g. Nouveau, Kit)" type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="search-input" />
        
        <div style={{display: 'flex', gap: '1rem'}}>
            <input placeholder="Stock Status" type="text" value={stockStatus} onChange={(e) => setStockStatus(e.target.value)} className="filter-input" />
            <input placeholder="Sold Count" type="number" value={soldCount} onChange={(e) => setSoldCount(e.target.value)} className="filter-input" />
            <input placeholder="WhatsApp Number" type="text" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} className="filter-input" />
        </div>

        <div>
          <h3>Specifications</h3>
          {specifications.map((spec, index) => (
            <SpecRow key={index} index={index} spec={spec} handleSpecChange={handleSpecChange} removeSpecField={removeSpecField} />
          ))}
          <button type="button" onClick={addSpecField} className="btn btn-inspect" style={{ width: 'auto', padding: '10px 20px'}}>+ Add Specification</button>
        </div>

        <div>
          <label htmlFor="productImages">Product Images</label>
          <input id="productImages" type="file" accept="image/*" onChange={handleImageChange} className="filter-input" multiple required />
        </div>
        
        <button type="submit" className="btn btn-reel" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Add Product'}
        </button>
        
        {error && <p style={{ color: 'var(--accent-red)' }}>{error}</p>}
        {success && <p style={{ color: 'var(--dot-stock)' }}>{success}</p>}
      </form>
    </div>
  );
};

export default AddProductPage;