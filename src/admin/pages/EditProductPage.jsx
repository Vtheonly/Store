// src/admin/pages/EditProductPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../api/supabaseClient";
import "./AddProductPage.css"; // Reuse the same CSS

// Reusing the SpecRow component from AddProductPage
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

const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [tags, setTags] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [soldCount, setSoldCount] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [specifications, setSpecifications] = useState([
    { label: "", value: "" },
  ]);

  // Image state: 'images' holds the current state of images in the UI
  // It can contain objects with a `file` property (new uploads) or a `url` property (existing images)
  const [images, setImages] = useState([]);
  // 'initialImageUrls' is a snapshot of the URLs when the component loaded, to track deletions.
  const [initialImageUrls, setInitialImageUrls] = useState([]);

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // --- Fetch existing product data ---
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        console.error("Error fetching product for edit:", error);
        setError(`Failed to load product data: ${error.message}`);
        setIsLoading(false);
      } else if (data) {
        setName(data.name || "");
        setDescription(data.description || "");
        setPrice(data.price || "");
        setOriginalPrice(data.original_price || "");
        setTags(data.tags?.join(", ") || "");
        setStockQuantity(data.stock_quantity ?? "");
        setSoldCount(data.sold_count ?? "");
        setWhatsappNumber(data.whatsapp_number || "+213123456789");
        setSpecifications(
          data.specifications?.length
            ? data.specifications
            : [{ label: "", value: "" }]
        );

        const existingImages =
          data.image_urls?.map((url) => ({ url, preview: url })) || [];
        setImages(existingImages);
        setInitialImageUrls(data.image_urls || []);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // --- Handlers for Specifications (same as AddProductPage) ---
  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
  };
  const addSpecField = () => {
    setSpecifications([...specifications, { label: "", value: "" }]);
  };
  const removeSpecField = (index) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
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
    const imageToRemove = images[indexToRemove];
    // If it's a new file, revoke the object URL to prevent memory leaks
    if (imageToRemove.file) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.file) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);

  // --- Form Submission Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // 1. Separate new files to upload from existing URLs to keep
      const newImageFiles = images
        .filter((img) => img.file)
        .map((img) => img.file);
      const keptImageUrls = images
        .filter((img) => img.url)
        .map((img) => img.url);

      // 2. Upload new files to Supabase Storage
      let newlyUploadedUrls = [];
      if (newImageFiles.length > 0) {
        const uploadPromises = newImageFiles.map((file) => {
          const filePath = `public/${Date.now()}_${file.name}`;
          return supabase.storage.from("product-images").upload(filePath, file);
        });
        const uploadResults = await Promise.all(uploadPromises);

        const uploadErrors = uploadResults.filter((result) => result.error);
        if (uploadErrors.length > 0) {
          throw new Error(
            `Failed to upload images: ${uploadErrors
              .map((err) => err.error.message)
              .join(", ")}`
          );
        }

        newlyUploadedUrls = uploadResults.map((result) => {
          const { data } = supabase.storage
            .from("product-images")
            .getPublicUrl(result.data.path);
          return data.publicUrl;
        });
      }

      // 3. Delete any old images that were removed from the UI
      const removedImageUrls = initialImageUrls.filter(
        (url) => !keptImageUrls.includes(url)
      );
      if (removedImageUrls.length > 0) {
        const filePathsToRemove = removedImageUrls.map((url) => {
          const pathStartIndex =
            url.indexOf("/product-images/") + "/product-images/".length;
          return url.substring(pathStartIndex);
        });
        await supabase.storage.from("product-images").remove(filePathsToRemove);
      }

      // 4. Combine kept and new URLs for the final list
      const finalImageUrls = [...keptImageUrls, ...newlyUploadedUrls];

      // 5. Prepare data for the 'products' table update
      const productData = {
        name,
        description,
        price: parseFloat(price),
        original_price: originalPrice ? parseFloat(originalPrice) : null,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        stock_quantity: parseInt(stockQuantity, 10) || 0,
        sold_count: parseInt(soldCount, 10) || 0,
        whatsapp_number: whatsappNumber,
        specifications: specifications.filter(
          (spec) => spec.label && spec.value
        ),
        image_urls: finalImageUrls,
      };

      // 6. Update the product in the database
      const { error: updateError } = await supabase
        .from("products")
        .update(productData)
        .eq("id", productId);

      if (updateError) throw updateError;

      setSuccess(
        "Product updated successfully! You will be redirected shortly."
      );
      setTimeout(() => navigate("/admin"), 2500);
    } catch (err) {
      console.error("Error updating product:", err);
      setError(`Failed to update product: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="add-product-container">
        <p>Loading product for editing...</p>
      </div>
    );
  }

  return (
    <div className="add-product-container">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          placeholder="Product Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="search-input"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="search-input"
          rows="5"
        />
        <div className="form-row">
          <input
            placeholder="Price (DA)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="filter-input"
            required
          />
          <input
            placeholder="Original Price (Optional)"
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="filter-input"
          />
        </div>
        <input
          placeholder="Tags (comma-separated)"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="search-input"
        />
        <div className="form-row">
          <input
            placeholder="Quantity in Stock"
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            className="filter-input"
          />
          <input
            placeholder="Sold Count"
            type="number"
            value={soldCount}
            onChange={(e) => setSoldCount(e.target.value)}
            className="filter-input"
          />
          <input
            placeholder="WhatsApp Number"
            type="text"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="filter-input"
          />
        </div>

        <div>
          <h3>Specifications</h3>
          {specifications.map((spec, index) => (
            <SpecRow
              key={index}
              index={index}
              spec={spec}
              handleSpecChange={handleSpecChange}
              removeSpecField={removeSpecField}
            />
          ))}
          <button
            type="button"
            onClick={addSpecField}
            className="btn btn-inspect"
            style={{ width: "auto", padding: "10px 20px" }}
          >
            + Add Specification
          </button>
        </div>

        <div>
          <h3>Product Images</h3>
          <div className="image-upload-section">
            <label htmlFor="productImages" className="dropzone-label">
              Click or Drag & Drop <br /> to Add More Images
            </label>
            <div className="image-preview-container">
              {images.map((image, index) => (
                <div key={image.preview} className="preview-item">
                  <img
                    src={image.preview}
                    alt={`preview ${index}`}
                    className="preview-image"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="remove-image-btn"
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <input
            id="productImages"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            style={{ display: "none" }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-reel"
          disabled={isSubmitting}
          style={{ marginTop: "1.5rem" }}
        >
          {isSubmitting ? "Updating..." : "Update Product"}
        </button>

        {error && (
          <p
            style={{
              color: "var(--accent-red)",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            {error}
          </p>
        )}
        {success && (
          <p
            style={{
              color: "var(--dot-stock)",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            {success}
          </p>
        )}
      </form>
    </div>
  );
};

export default EditProductPage;
