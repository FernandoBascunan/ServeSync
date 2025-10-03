package servesync.Mesas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import servesync.Mesas.entity.Zona;
import servesync.Mesas.service.ZonaService;

import java.util.List;
import java.util.Map;

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
    @PostMapping("/empresa")
    public List<Zona> getAllZonesByEmpresa(@RequestBody Map<String, Long> body) {
        Long empresaId = body.get("empresaId");
        return zonaService.getZonaByEmpresa(empresaId);
    }

}
