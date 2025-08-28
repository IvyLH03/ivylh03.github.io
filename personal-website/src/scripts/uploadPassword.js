const updateLocalUploadPassword = () => {
  const password = prompt("Enter the upload password")
  if (password) {
    localStorage.setItem("upload_password", password)
    alert("Upload password updated")
  }
}

export default updateLocalUploadPassword;