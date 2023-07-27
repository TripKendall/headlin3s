export default function processData(data) {

  const processedData = []
 
  data.forEach(e => {

    const r = Math.floor(Math.random() * 9) + 1

    if (e.image) {
      e.pic = `../../assets/images/${e.image}`
    } else {
      e.pic = `/assets/images/random${r}.webp`
    }
    e.linkInfo = `http://localhost:3000/link-info/${e.slug}`
    e.publicRating = Math.round((e.rating * Math.random() * .94 + e.clicks * Math.random() * .94) * 4.9)
    e.details = {
      name: e.name,
      id: e._id,
      rating: e.publicRating
    }
    e.meta = {
      category: e.category,
      bias: e.pol,
    }
    e.share = {
      url: e.url,
      name: e.name,
      shareDescription: `${e.desc}  via Headlin3s.com`,
      tagString: e.tags.join(', ')
    }
    e.header = {
      url: e.url,
      name: e.name,
      img: e.image,
      // img: e.image,
    }
    e.description = {
      description: e.desc,
      dateline: e.dateline,
    }
    
    processedData.push({
      details: e.details,
      meta: e.meta,
      share: e.share,
      header: e.header,
      description: e.description,
      tags: e.tags,
    })

  });

  return processedData

}
      