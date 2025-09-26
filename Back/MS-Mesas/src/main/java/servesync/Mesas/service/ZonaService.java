package servesync.Mesas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import servesync.Mesas.entity.Zona;
import servesync.Mesas.repository.ZonaRepository;

import java.util.List;


@Service
public class ZonaService {
    @Autowired
    ZonaRepository zonaRepository;
    public List<Zona> getZona(Long empresaId) {
        return zonaRepository.findAllByEmpresaId(empresaId);
    }
    public Zona crearZona(Zona zona) {
        return zonaRepository.save(zona);
    }
    public void eliminarZona(int zonaId) {
        zonaRepository.deleteById(zonaId);
    }


}
