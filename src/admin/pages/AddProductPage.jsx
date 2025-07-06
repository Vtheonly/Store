// src/admin/pages/AddProductPage.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../../api/supabaseClient";
import "./AddProductPage.css"; // Import the new stylesheet

// A small component for a single specification row
const SpecRow = ({ index, spec, handleSpecChange, removeSpecField }) => (
  <div className="form-row" style={{ marginBottom: "10px" }}>
    <input
      type="text"
      placeholder="Label (e.g. Puissance)"
      value={spec.label}
      onChange={(e) => handleSpecChange(index, "label", e.target.value)}
      className="filter-input"
    />
    <input
      type="text"
      placeholder="Value (e.g. 200W)"
      value={spec.value}
      onChange={(e) => handleSpecChange(index, "value", e.target.value)}
      className="filter-input"
    />
    <button
      type="button"
      onClick={() => removeSpecField(index)}
      className="btn btn-inspect"
      style={{ flexShrink: 0, width: "60px" }}
    >
      X
    </button>
  </div>
);

const AddProductPage = () => {
  // State for all product fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [tags, setTags] = useState("");
  const [stockQuantity, setStockQuantity] = useState(""); // <-- CHANGED from stockStatus
  const [soldCount, setSoldCount] = useState(""); // Use empty string for placeholder
  const [whatsappNumber, setWhatsappNumber] = useState("+213123456789");
  const [specifications, setSpecifications] = useState([
    { label: "", value: "" },
  ]);
  const [images, setImages] = useState([]);

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
    setSpecifications([...specifications, { label: "", value: "" }]);
  };
  const removeSpecField = (index) => {
    const newSpecs = specifications.filter((_, i) => i !== index);
    setSpecifications(newSpecs);
  };

  // --- Image Handlers ---
  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };
  const handleRemoveImage = (indexToRemove) => {
    URL.revokeObjectURL(images[indexToRemove].preview);
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  // Cleanup effect
  useEffect(() => {
    return () => images.forEach((image) => URL.revokeObjectURL(image.preview));
  }, [images]);

  // --- Form Submission Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      setError("Please upload at least one image.");
      return;
    }
    setIsUploading(true);
    setError(null);
    setSuccess(null);
    const uploadPromises = images.map((imageObj) => {
      const file = imageObj.file;
      const filePath = `public/${Date.now()}_${file.name}`;
      return supabase.storage.from("product-images").upload(filePath, file);
    });
    try {
      const uploadResults = await Promise.all(uploadPromises);
      const uploadErrors = uploadResults.filter((result) => result.error);
      if (uploadErrors.length > 0) {
        throw new Error(`Failed to upload images: ${uploadErrors.map((e) => e.error.message).join(", ")}`);
      }
      const imageUrls = uploadResults.map((result) => {
        const { data } = supabase.storage.from("product-images").getPublicUrl(result.data.path);
        return data.publicUrl;
      });
      // --- UPDATED to save stock_quantity instead of stock_status ---
      const productData = { name, description, price: parseFloat(price), original_price: originalPrice ? parseFloat(originalPrice) : null, tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean), stock_quantity: parseInt(stockQuantity, 10) || 0, sold_count: parseInt(soldCount, 10) || 0, whatsapp_number: whatsappNumber, specifications: specifications.filter((spec) => spec.label && spec.value), image_urls: imageUrls, currency: 'DA' };
      const { error: insertError } = await supabase.from("products").insert([productData]);
      if (insertError) throw insertError;
      setSuccess("Product added successfully!");
    } catch (err) {
      console.error("Error:", err.message);
      setError(`Failed to add product: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input placeholder="Product Name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="search-input" required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="search-input" rows="5" />

        <div className="form-row">
          <input placeholder="Price (DA)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="filter-input" required />
          <input placeholder="Original Price (Optional)" type="number"value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="filter-input"/>
        </div>

        <input placeholder="Tags (comma-separated, e.g. Nouveau, Kit)" type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="search-input"/>

        {/* --- UPDATED input row --- */}
        <div className="form-row">
          <input placeholder="Quantity in Stock" type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} className="filter-input"/>
          <input placeholder="Sold Count" type="number" value={soldCount} onChange={(e) => setSoldCount(e.target.value)} className="filter-input" />
          <input placeholder="+213123456789" type="text" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} className="filter-input" />
        </div>

        <div>
          <h3>Specifications</h3>
          {specifications.map((spec, index) => (
            <SpecRow key={index} index={index} spec={spec} handleSpecChange={handleSpecChange} removeSpecField={removeSpecField} />
          ))}
          <button type="button" onClick={addSpecField} className="btn btn-inspect" style={{ width: "auto", padding: "10px 20px" }}>
            + Add Specification
          </button>
        </div>

        <div>
          <h3>Product Images</h3>
          <div className="image-upload-section">
            <label htmlFor="productImages" className="dropzone-label">
              Click or Drag & Drop <br /> to Upload Images
            </label>
            <div className="image-preview-container">
              {images.map((image, index) => (
                <div key={image.preview} className="preview-item">
                  <img src={image.preview} alt={`preview ${index}`} className="preview-image" />
                  <button type="button" onClick={() => handleRemoveImage(index)} className="remove-image-btn" title="Remove image">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <input id="productImages" type="file" accept="image/*" onChange={handleImageChange} multiple required={images.length === 0} style={{ display: "none" }} />
        </div>

        <button type="submit" className="btn btn-reel" disabled={isUploading} style={{ marginTop: "1.5rem" }} >
          {isUploading ? "Uploading..." : "Add Product"}
        </button>

        {error && <p style={{ color: "var(--accent-red)", textAlign: "center", marginTop: "1rem" }}>{error}</p>}
        {success && <p style={{ color: "var(--dot-stock)", textAlign: "center", marginTop: "1rem" }}>{success}</p>}
      </form>
    </div>
  );
};

export default AddProductPage;