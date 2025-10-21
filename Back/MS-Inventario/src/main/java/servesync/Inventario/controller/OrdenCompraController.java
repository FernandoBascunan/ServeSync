package servesync.Inventario.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import servesync.Inventario.dto.OrdenCompraDTO;
import servesync.Inventario.dto.OrdenResponseDTO;
import servesync.Inventario.service.OrdenCompraService;

import java.util.List;

@RestController
@RequestMapping("api/ordenCompra")
public class OrdenCompraController {
    @Autowired
    OrdenCompraService ordenCompraService;
    @PutMapping
    public void ingresarOrden(@RequestBody OrdenCompraDTO ordenCompra) {
        ordenCompraService.ingresar(ordenCompra);
    }
    @GetMapping("/{empresaID}")
    public ResponseEntity<List<OrdenResponseDTO>> listarOrdenes(@PathVariable Long empresaID) {
        List<OrdenResponseDTO> ordenes = ordenCompraService.listarOrdenPorEmpresa(empresaID);
        return ResponseEntity.ok(ordenes);
    }

}
