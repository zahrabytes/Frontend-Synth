import { useRef, useState } from "react";

const ArtistProfile = () => {
    const inputRef = useRef(null);
    const [image, setImage] = useState("");

    const handleImageClick = () =>{
        inputRef.current.click();
    };

    const handleImageChange = (event) =>{
        const file = event.target.files[0];
        console.log(file);
        setImage(event.target.files[0]);
    };

    return ( 
        <>
        <div className="image-upload-container">
            <div className="glass-static">
            <div onClick={handleImageClick}>
                {image ? (
                    <img src={URL.createObjectURL(image)} alt="" className="img-display-after" />
                ) : (
                    <div className="text-display-before">Upload Image</div>
                )}
                <input 
                    type="file" 
                    ref={inputRef} 
                    onChange={handleImageChange} 
                    style={{display: "none"}}
                />
            </div>
                <button className="image-upload-button">Upload</button>
            </div>
        </div>
        </>
    );
}
 
export default ArtistProfile;
