package com.example.demo.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
    private ProductRepository productRepository;
	
	public Product createProduct(Product product) {
        return productRepository.save(product);
    }
	
	public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
	
	public Product getProductById(long productId) {
        Optional<Product> productOptional = productRepository.findById(productId);
        return productOptional.orElse(null);
    }
	
	public Product updateProduct(long productId, Product product) {
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isPresent()) {
            product.setId(productId);
            return productRepository.save(product);
        } else {
            return null;
        }
    }

	public void deleteProduct(long productId) {
        productRepository.deleteById(productId);
    }
}
