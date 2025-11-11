package servesync.Mesas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import servesync.Mesas.entity.Mesa;
import servesync.Mesas.repository.MesaRepository;

import java.util.List;

// Se encarga de orquestar las operaciones del repositorio, incluyendo listar mesas por zona, crear nuevas mesas, eliminarlas y actualizar su estado.

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
    public Mesa actualizarMesa(Long id, Mesa mesaActualizada) {
        Mesa mesaExistente = mesaRepository.findById(id.intValue())
                .orElseThrow(() -> new RuntimeException("Mesa no encontrada"));

        mesaExistente.setStatus(mesaActualizada.getStatus());

        return mesaRepository.save(mesaExistente);
    }

}
