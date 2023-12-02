import React, { useState } from 'react'
import Card from '../../card/Card';
import styles from './AddProduct.module.scss'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../../firebase/config';
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../loader/Loader';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../redux/slice/productSlice';

const continents = [
  { id: 1, name: "Europa" },
  { id: 2, name: "Asia" },
  { id: 3, name: "America" },
  { id: 4, name: "Africa" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  continent: "",
  country: "",
  desc: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const storageRef = ref(storage, `gourmet_images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress)
      },
      (error) => {
        toast.error(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL })
          toast.success("Imaginea a fost încărcată cu succes!")
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        continent: product.continent,
        country: product.country,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      toast.success("Preparat încărcat cu succes!");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        continent: product.continent,
        country: product.country,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Preparatul a fost editat cu succes!");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Adaugă un nou preparat", "Editează acest preparat")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
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
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="Imagine"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder="Image URL"
                  name="imageURL"
                  value={product.imageURL}
                  disabled
                />
              )}
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
              {detectForm(id, "Salvează", "Editează")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default AddProduct