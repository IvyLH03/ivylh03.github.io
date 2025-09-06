// handle api calls to backend for notes

// check if in development mode
const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://blog.ivylh03.net"

// Get all notes.
// Options: include_private=true to include private notes.
// HTTP POST /notes with body {upload_password: string} to get private notes.
export async function getAllNotes(include_private=false) {
  let url = `${BASE_URL}/notes/all`
  if (include_private) {
    url += "?include_private=true"
  }
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uploadPassword: localStorage.getItem("upload_password") || ""
    }),
  })
  if (!res.ok) {
    throw new Error(`Error fetching notes: ${res.status} ${res.statusText}`)
  }
  const data = await res.json()
  return data
}


export async function deleteNote(id) {
  const url = `${BASE_URL}/notes/${id}`
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uploadPassword: localStorage.getItem("upload_password") || ""
    }),
  })
  if (!res.ok) {
    throw new Error(`Error deleting note: ${res.status} ${res.statusText}`)
  }
}

export async function createNote(content, labels=[], isPrivate=false) {
  const url = `${BASE_URL}/notes/`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      labels,
      visibility: !isPrivate,
      uploadPassword: localStorage.getItem("upload_password") || ""
    }),
  })
  if (!res.ok) {
    throw new Error(`Error creating note: ${res.status} ${res.statusText}`)
  }
  const data = await res.json()
  return data
}