package servesync.Inventario.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import servesync.Inventario.dto.VentaDTO;
import servesync.Inventario.dto.VentaResponseDTO;
import servesync.Inventario.service.VentaService;

import java.util.List;

@RestController
@RequestMapping("api/ventas")
public class VentaController {
    @Autowired
    private VentaService ventaService;
    @GetMapping
    public ResponseEntity<List<VentaResponseDTO>> listarVentas() {
        List<VentaResponseDTO> ventas = ventaService.listar();
        return ResponseEntity.ok(ventas);
    }
    @PutMapping
    public ResponseEntity<VentaResponseDTO> registrarVenta(@RequestBody  VentaDTO ventaDTO) {
        VentaResponseDTO nuevaVenta = ventaService.registrarVenta(ventaDTO);
        return ResponseEntity.ok(nuevaVenta);
    }


}
