const Product = require('../models/Product');
const User = require('../models/User');

const ProductController = {
    async criarProduto(req, res) {
        const { id } = req.params; // user_id
        const bodyData = req.body;

        try {
            bodyData.name = id;

            const novoProduto = await Product.create(bodyData);
            return res.status(200).json(novoProduto);
        } catch (err) {
            return res.status(400).json(err);
        }
    },
    

    async listarUsuarioProdutos(req, res) {
        const { userId } = req.params;

        try {

            const listarUsuarioProdutos = await Product.find({ userId });
            return res.status(200).json(listarUsuarioProdutos);

        } catch (err) {
            return res.status(400).json(err);
        }
    },

    async editarProduto(req, res) {
        
        const bodyData = req.body
        const { product_id, user_id } = req.params

        try {
            const editarProduto = await Product.findByIdAndUpdate(product_id, bodyData, {new: true})
            return res.status(200).json(editarProduto)

        } catch (err) {
            return res.status(400).json(err)
        }
    },
    

    async deletarProduto(req, res) {
        const { product_id } = req.params;

        try {
            await Product.findByIdAndDelete(product_id);
            return res.status(200).json({ msg: 'Produto deletado com sucesso!' });
        } catch (err) {
            return res.status(400).json(err);
        }
    },

    async listarProdutos(req, res) {
        try {
            const produtos = await Product.find();
            return res.status(200).json(produtos);
        } catch (err) {
            return res.status(400).json(err);
        }
    },

    async listarProdutosById(req, res) {
        const { product_id } = req.params;

        try {
            const produto = await Product.findById(product_id);
            if (!produto) {
                return res.status(404).json({ msg: 'Produto não encontrado!' });
            }
            return res.status(200).json(produto);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
};

module.exports = ProductController;
