package servesync.Mesas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import servesync.Mesas.entity.Zona;
import servesync.Mesas.service.ZonaService;

import java.util.List;

@RestController
@RequestMapping("/api/zonas")
public class ZonaController {
    @Autowired
    private ZonaService zonaService;
    @GetMapping("/empresa/{empresaId}")
    public List<Zona> getAllZones(@PathVariable Long empresaId) {
        return zonaService.getZona(empresaId);
    }
    @PostMapping
    public Zona createZona(@RequestBody Zona zona) {
        return zonaService.crearZona(zona);
    }
    @DeleteMapping("/{zonaId}")
    public void eliminarZona(@PathVariable int zonaId) {
        zonaService.eliminarZona(zonaId);
    }

}
