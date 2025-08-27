package servesync.Inventario.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import servesync.Inventario.entity.Producto;
import servesync.Inventario.service.ProductoService;

import java.util.List;

@RestController
@RequestMapping("api/inventario")
public class InventarioController {
    @Autowired
    private ProductoService productoService;

    @GetMapping
    public List<Producto> mostrarStock(Long empresaID) {
        return productoService.listarProductos(empresaID);
    }
    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        return productoService.crearProducto(producto);
    }
    @PutMapping("/{id}")
    public Producto actualizar(@PathVariable Long id, @RequestBody Producto producto) {
        return productoService.actualizarProducto(producto,id);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        productoService.eliminarProducto(id);
    }

}
