package servesync.Mesas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import servesync.Mesas.entity.Zona;
import servesync.Mesas.repository.ZonaRepository;

import java.util.List;

// Representa la lógica de negocio para la gestión de zonas dentro del sistema.
// Permite crear, eliminar y listar zonas por empresa, funcionando como intermediario entre el controlador y el repositorio.

@Service
public class ZonaService {
    @Autowired
    ZonaRepository zonaRepository;
    public Zona crearZona(Zona zona) {
        return zonaRepository.save(zona);
    }
    public void eliminarZona(int zonaId) {
        zonaRepository.deleteById(zonaId);
    }
    public List<Zona> getZonaByEmpresa(Long empresaId) {
        return zonaRepository.findByEmpresaId(empresaId);
    }

}
