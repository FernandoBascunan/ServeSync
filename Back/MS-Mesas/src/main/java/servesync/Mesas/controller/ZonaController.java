package servesync.Mesas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import servesync.Mesas.entity.Zona;
import servesync.Mesas.service.ZonaService;

import java.util.List;

@RestController
@RequestMapping("/api/mesas/zonas")
public class ZonaController {
    @Autowired
    private ZonaService zonaService;

    @PostMapping
    public Zona createZona(@RequestBody Zona zona) {
        return zonaService.crearZona(zona);
    }
    @DeleteMapping("/{zonaId}")
    public void eliminarZona(@PathVariable int zonaId) {
        zonaService.eliminarZona(zonaId);
    }
    // 🔹 Obtener zonas por empresa (GET)
    @GetMapping("/{empresaId}")
    public List<Zona> getZonasByEmpresa(@PathVariable Long empresaId) {
        return zonaService.getZonaByEmpresa(empresaId);
    }
}
