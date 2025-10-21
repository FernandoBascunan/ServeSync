package servesync.Inventario.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import servesync.Inventario.dto.VentaCantidadDTO;
import servesync.Inventario.dto.VentaDTO;
import servesync.Inventario.dto.VentaResponseDTO;
import servesync.Inventario.service.VentaService;

import java.util.List;

@RestController
@RequestMapping("api/ventas")
public class VentaController {
    @Autowired
    private VentaService ventaService;
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
    @PostMapping
    public ResponseEntity<VentaResponseDTO> registrarVenta(@RequestBody  VentaDTO ventaDTO) {
        VentaResponseDTO nuevaVenta = ventaService.registrarVenta(ventaDTO);
        return ResponseEntity.ok(nuevaVenta);
    }


}
