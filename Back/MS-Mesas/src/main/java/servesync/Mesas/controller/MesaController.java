package servesync.Mesas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import servesync.Mesas.entity.Mesa;
import servesync.Mesas.service.MesaService;

import java.util.List;

@RestController
@RequestMapping("/apí/mesas")
public class MesaController {
    @Autowired
    MesaService mesaService;
    @PutMapping
    public Mesa crearMesa(Mesa mesa) {
         return mesaService.crearMesa(mesa);
    }
    @DeleteMapping("/{id}")
    public void eliminarMesa(int id) {
        mesaService.eliminarMesa(id);
    }
    @GetMapping("/{id}")
    public List<Mesa> mesasPorZona(int zonaId) {
         return mesaService.mostrarMesas(zonaId);
    }

}
