import {bias} from "./bias.js"
import {cats} from "./cats.js"
import swal from "sweetalert2"

export default function validateData(data) {

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (data.name === undefined || data.name === "") {
    swal.fire({
      icon: "error",
      title: "No Title",
      text: "Please enter a unique Headlin3",
    });
    return false;
  }

  if (data.name.length > 30) {
    swal.fire({
      icon: "error",
      title: "Headlin3 too long",
      text: "Please enter a Description of less than 20-25 characters",
    });
    return false;
  }

  // If data lookups become less expensive, we can check for duplicates here
  // as is I can't afford it at this point tbh.

  // make sure there is a description and it is not longer than 100 characters
  
  if (data.desc === undefined || data.desc === "") {
    swal.fire({
      icon: "error",
      title: "No Description",
      text: "Please enter a Description of somewhere around 75 characters",
    });
    return false;
  }

  if (data.desc.length > 100) {
    swal.fire({
      icon: "error",
      title: "Description too long",
      text: "Please enter a Description of somewhere around 75 characters",
    });
    return false;
  }

  // checking the url

  if (data.url === undefined || data.url === "") {
    swal.fire({
      icon: "error",
      title: "No URL",
      text: "Please enter a URL for your Headlin3",
    });
    return false;
  }

  if (!data.url.match(regex)) {
    swal.fire({
      icon: "error",
      title: "Bad URL",
      text: "Please enter a valid URL",
    });
    return false;
  }

  // make sure there is an image and that it ends in .webp

  if (data.image === undefined || data.image === "") {
    swal.fire({
      icon: "error",
      title: "No Image",
      text: "Please enter an image file name.",
    });
    return false;
  }

  if (!data.image.endsWith(".webp")) {
    swal.fire({
      icon: "error",
      title: "Only .webp images",
      text: "Image file should end in .webp only.",
    });
    return false;
  }

  //

  if (data.pol === undefined || data.pol === "") {
    swal.fire({
      icon: "error",
      title: "No Bias",
      text: "Each Headlin3 must have a bias.  Please set pol to 0 as a default.",
    });
    return false;
  }

  if (bias.includes(Number(data.pol)) === false) {
    swal.fire({
      icon: "error",
      title: "Not a valid bias",
      text: "Bias must be a number between -2 and 2 inclusive.",
    });
    return false;
  }

  if (data.category === undefined || data.category === "") {
    swal.fire({
      icon: "error",
      title: "No Category",
      text: "Each Headlin3 must have a category.  Please choose News as a default.",
    });
    return false;
  }

  if (cats.includes(data.category) === false) {
    swal.fire({
      icon: "error",
      title: "Not a valid category",
      text: "Category must be one of the following: " + cats.join(", "),
    });

    return false;
  }

  if (data.dateline === undefined || data.dateline === "") {
    swal.fire({
      icon: "error",
      title: "No Dateline",
      text: "Each Headlin3 must have a dateline.  Please enter an appropriate country, state, or city.",
    });
    return false;
  }

  return true

};
