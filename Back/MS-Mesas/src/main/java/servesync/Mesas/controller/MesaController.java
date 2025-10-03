package servesync.Mesas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import servesync.Mesas.entity.Mesa;
import servesync.Mesas.service.MesaService;

import java.util.List;

@RestController
@RequestMapping("/api/mesas")
public class MesaController {
    @Autowired
    MesaService mesaService;
    @PostMapping
    public Mesa crearMesa(@RequestBody Mesa mesa) {
         return mesaService.crearMesa(mesa);
    }
    @DeleteMapping("/{id}")
    public void eliminarMesa(@PathVariable int id) {
        mesaService.eliminarMesa(id);
    }
    @GetMapping("/{zonaId}")
    public List<Mesa> mesasPorZona(@PathVariable int zonaId) {
         return mesaService.mostrarMesas(zonaId);
    }

}
