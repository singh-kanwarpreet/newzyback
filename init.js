const Article = require('./model/news.js');
const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/news');
    console.log('Successfully connected to MongoDB');

    // Array of documents to insert
    
  const articles = [
  {
        title: "The Future of Artificial Intelligence: Trends and Predictions",
        views: 25000,
        description: "Artificial Intelligence (AI) is evolving rapidly. This article explores the future trends and predictions for AI technology and its impact on various industries.",
        image: "https://plus.unsplash.com/premium_photo-1683120966127-14162cdd0935?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
        category: "Tech"
    },
    {
        title: "Blockchain Beyond Cryptocurrency: Real-World Applications",
        views: 22000,
        description: "Blockchain technology is not just for cryptocurrencies. This article examines how blockchain is being used in various fields such as supply chain management, healthcare, and more.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
        category: "Tech"
    },
    {
        title: "The Rise of Quantum Computing: What You Need to Know",
        views: 18000,
        description: "Quantum computing promises to revolutionize the world of technology. This article provides an overview of quantum computing, its potential, and the challenges it faces.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
        category: "Tech"
    },
    {
        title: "Cybersecurity in the Age of Digital Transformation",
        views: 16000,
        description: "As businesses embrace digital transformation, cybersecurity becomes more crucial. This article discusses the key strategies and technologies for safeguarding digital assets.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
        category: "Tech"
    },
    {
        title: "5G Technology: How It Will Change the Way We Connect",
        views: 15000,
        description: "5G technology is set to enhance connectivity and enable new applications. This article explores how 5G will impact communication, business, and daily life.",
        image: "https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
        category: "Tech"
    },
    {
        title: "The Evolution of Smart Devices: From Phones to Homes",
        views: 14000,
        description: "Smart devices have evolved from simple phones to complex home automation systems. This article traces the development of smart technology and its implications for the future.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
        category: "Tech"
    }
];



   

    // Insert multiple documents
    const result = await Article.insertMany(articles);
    console.log('Articles inserted:', result);
  } catch (err) {
    console.error('Error inserting articles:', err);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

main();
