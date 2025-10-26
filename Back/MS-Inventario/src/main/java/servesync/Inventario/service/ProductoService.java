package servesync.Inventario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import servesync.Inventario.entity.Producto;
import servesync.Inventario.repository.ProductoRepository;

import java.util.List;


@Service
public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;

    public Producto crearProducto(Producto producto) {
        System.out.println(producto.getStockActual());
        return productoRepository.save(producto);
    }

    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }
    public Producto actualizarProducto(Producto producto,Long id) {
        return productoRepository.save(producto);
    }
    public List<Producto> listarProductosPorEmpresa(Long empresaID) {
        return productoRepository.findByEmpresaID(empresaID);
    }


}
