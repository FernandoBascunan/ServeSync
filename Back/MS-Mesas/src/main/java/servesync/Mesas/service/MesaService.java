package servesync.Mesas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import servesync.Mesas.entity.Mesa;
import servesync.Mesas.repository.MesaRepository;

import java.util.List;

@Service
public class MesaService {
    @Autowired
    MesaRepository mesaRepository;
    public List<Mesa> mostrarMesas(int zonaId){
        return mesaRepository.findAllByZonaId(zonaId);
    }
    public Mesa crearMesa(Mesa mesa) {
        return mesaRepository.save(mesa);
    }
    public void eliminarMesa(int id) {
        mesaRepository.deleteById(id);
    }
}
