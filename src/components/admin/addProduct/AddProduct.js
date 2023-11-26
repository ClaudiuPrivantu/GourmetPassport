import React, { useState } from 'react'
import Card from '../../card/Card';
import styles from './AddProduct.module.scss'
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase/config';

const continents = [
  { id: 1, name: "Europa" },
  { id: 2, name: "Asia" },
  { id: 3, name: "America" },
  { id: 4, name: "Africa" },
];

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    price: null,
    continent: "",
    country: "",
    desc: "",

  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const storageRef = ref(storage, `gourmet_images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  };

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <>
      <div className={styles.product}>
        <h2>Adaugă un nou preparat</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={addProduct}>
            <label>Numele preparatului:</label>
            <input
              type="text"
              placeholder="Numele preparatului"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Imagine:</label>
            <Card cardClass={styles.group}>
              <div className={styles.progress}>
                <div
                  className={styles["progress-bar"]}
                  style={{ width: "50%" }}
                >
                  Uploading 50%
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                placeholder="Imagine"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />


              <input
                type="text"
                // required
                placeholder="Image URL"
                name="imageURL"
                value={product.imageURL}
                disabled
              />

            </Card>

            <label>Preț:</label>
            <input
              type="number"
              placeholder="Preț"
              required
              name="price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Continent:</label>
            <select
              required
              name="continent"
              value={product.continent}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                - alegeți originea preparatului -
              </option>
              {continents.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <label>Țara de proveniență:</label>
            <input
              type="text"
              placeholder="Țară de proveniență"
              required
              name="country"
              value={product.country}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Descriere preparat și rețetă:</label>
            <textarea
              name="desc"
              required
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            ></textarea>

            <button className="--btn --btn-primary">
              Salvează
            </button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default AddProduct