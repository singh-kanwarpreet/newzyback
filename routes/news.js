const express = require('express');
const router = express.Router();
const Article = require('../model/news.js');

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ views: -1 });
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
});

// Get article by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findOne({ _id: id });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await Article.findByIdAndUpdate(id, { views: article.views + 1 });

    const updatedArticle = await Article.findById(id);

    res.json(updatedArticle);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ message: 'Failed to fetch the article' });
  }
});

// Get articles by category
router.get('/category/:content', async (req, res) => {
  const { content } = req.params;

  try {
    const articles = await Article.find({ category: content }).sort({ views: -1 });

    if (articles.length === 0) {
      return res.status(404).json({ message: 'No articles found for this category' });
    }

    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
});

router.get('/recommendation/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const articles = await Article.find({ _id: { $ne: id } }).limit(3);
    res.json(articles);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Failed to fetch recommendations' });
  }
});

router.get('/search/:query', async (req, res) => {
    const { query } = req.params; 

    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required.' });
    }

    try {
        
        const results = await Article.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, 
                { description: { $regex: query, $options: 'i' } } 
            ]
        });

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
