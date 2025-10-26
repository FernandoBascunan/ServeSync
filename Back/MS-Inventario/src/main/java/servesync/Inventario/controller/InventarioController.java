package servesync.Inventario.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import servesync.Inventario.dto.ProductoDTO;
import servesync.Inventario.entity.Producto;
import servesync.Inventario.service.ProductoService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/inventario")
public class InventarioController {
    @Autowired
    private ProductoService productoService;
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

    @GetMapping("/{empresaID}")
    public List<ProductoDTO> mostrarStockPorEmpresa(@PathVariable Long empresaID) {
        List<Producto> productos = productoService.listarProductosPorEmpresa(empresaID);

        return productos.stream()
                .map(p -> new ProductoDTO(
                        p.getId(),
                        p.getNombre(),
                        p.getStockActual(),
                        p.getPrecio(),
                        p.getCategoria(),
                        p.getEmpresaID()
                ))
                .collect(Collectors.toList());
    }

}
