export default function routeSort(sortRoute) {
  let sortUrl 
  if (sortRoute === "Highest Rated") {
    sortUrl = "http://localhost:5000/api/v1/links/?sort=-clicks"
  } else if (sortRoute === "Right Bias") {
    sortUrl = "http://localhost:5000/api/v1/links/?pol=1"
  }else if (sortRoute === "Far Right Bias") {
    sortUrl = "http://localhost:5000/api/v1/links/?pol=2"
  }else if (sortRoute === "Left Bias") {
    sortUrl = "http://localhost:5000/api/v1/links/?pol=-1"
  }else if (sortRoute === "Far Left Bias") {
    sortUrl = "http://localhost:5000/api/v1/links/?pol=-2"
  }else if (sortRoute === "Center Biased")  {
    sortUrl = "http://localhost:5000/api/v1/links/?pol=0"
  }else if (sortRoute === "Least Clicked")  {
    sortUrl = "http://localhost:5000/api/v1/links/?sort=clicks"
  }else if (sortRoute === "Oldest")  {
    sortUrl = "http://localhost:5000/api/v1/links/?sort=date_time"
  }else if (sortRoute === "Newest")  {
    sortUrl = "http://localhost:5000/api/v1/links/"
  }
  return sortUrl
}
