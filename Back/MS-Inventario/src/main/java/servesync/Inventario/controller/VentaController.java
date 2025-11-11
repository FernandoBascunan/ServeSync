package servesync.Inventario.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import servesync.Inventario.dto.VentaCantidadDTO;
import servesync.Inventario.dto.VentaDTO;
import servesync.Inventario.dto.VentaResponseDTO;
import servesync.Inventario.entity.Venta;
import servesync.Inventario.repository.VentaRepository;
import servesync.Inventario.service.VentaService;
import java.util.List;

// Gestiona los endpoints REST relacionados con las ventas dentro del microservicio de inventario en ServeSync.
// Permite listar ventas por empresa, obtener ventas por producto y empresa, registrar nuevas ventas y marcar una venta como finalizada.

@RestController
@RequestMapping("api/inventario/ventas")
public class VentaController {
    @Autowired
    private VentaService ventaService;
    @Autowired
    private VentaRepository ventaRepository;
    @GetMapping("/{empresaId}")
    public ResponseEntity<List<VentaResponseDTO>> listarVentas(@PathVariable Long empresaId) {
        List<VentaResponseDTO> ventas = ventaService.listar(empresaId);
        return ResponseEntity.ok(ventas);
    }
    @GetMapping("/empresa/{empresaID}/producto/{productoID}")
    public List<VentaCantidadDTO> getVentasByEmpresaAndProducto(
            @PathVariable Long empresaID,
            @PathVariable Long productoID) {
        return ventaService.getVentasByEmpresaAndProducto(empresaID, productoID);
    }
    @PutMapping
    public ResponseEntity<VentaResponseDTO> registrarVenta(@RequestBody  VentaDTO ventaDTO) {
        VentaResponseDTO nuevaVenta = ventaService.registrarVenta(ventaDTO);
        return ResponseEntity.ok(nuevaVenta);
    }
    @PatchMapping("/{ventaId}/terminar")
    public Venta terminarPedido(@PathVariable Long ventaId) {
        Venta venta = ventaRepository.findById(ventaId)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con ID: " + ventaId));

        venta.setActiva(false);
        return ventaRepository.save(venta);
    }

}
