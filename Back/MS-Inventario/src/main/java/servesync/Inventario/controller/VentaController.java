package servesync.Inventario.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import servesync.Inventario.entity.Venta;
import servesync.Inventario.service.VentaService;

import java.util.List;

@RestController
@RequestMapping("api/ventas")
public class VentaController {
    @Autowired
    private VentaService ventaService;
    @GetMapping
    public List<Venta> listarVentas(Long empresaId) {
        return ventaService.listar(empresaId);
    }
    @PutMapping
    public Venta registrarVenta(Venta venta) {
        return ventaService.registrarVenta(venta);
    }


}
