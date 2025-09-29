package servesync.Inventario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import servesync.Inventario.config.TenantContext;
import servesync.Inventario.entity.Producto;
import servesync.Inventario.repository.ProductoRepository;

import java.util.List;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> listarProductos() {
        Long empresaId = TenantContext.getCurrentTenant();
        return productoRepository.findAllByEmpresaID(empresaId);
    }
    public Producto crearProducto(Producto producto) {
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
