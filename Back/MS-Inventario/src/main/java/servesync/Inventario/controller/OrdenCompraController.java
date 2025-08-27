package servesync.Inventario.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import servesync.Inventario.entity.OrdenCompra;
import servesync.Inventario.service.OrdenCompraService;

import java.util.List;

@RestController
@RequestMapping("api/ordenCompra")
public class OrdenCompraController {
    @Autowired
    OrdenCompraService ordenCompraService;
    @PutMapping
    public void ingresarOrden(@RequestBody OrdenCompra ordenCompra) {
        ordenCompraService.ingresar(ordenCompra);
    }
    @GetMapping
    public List<OrdenCompra> listarOrdenes(Long empresaId) {
        return ordenCompraService.Ordenes(empresaId);
    }

}
