package servesync.Mesas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import servesync.Mesas.entity.Zona;
import servesync.Mesas.service.ZonaService;

import java.util.List;

@RestController
@RequestMapping("/api/zona")
public class ZonaController {
    @Autowired
    private ZonaService zonaService;
    @GetMapping("/{id}")
    public List<Zona> getAllZones(Long empresaId) {
        return zonaService.getZona(empresaId);
    }
    @PutMapping
    public Zona createZona(@RequestBody Zona zona) {
        return zonaService.crearZona(zona);
    }
    @DeleteMapping("/{id}")
    public void eliminarZona(int zonaId) {
        zonaService.eliminarZona(zonaId);
    }

}
