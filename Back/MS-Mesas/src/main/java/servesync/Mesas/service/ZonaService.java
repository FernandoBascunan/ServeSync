package servesync.Mesas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import servesync.Mesas.config.TenantContext;
import servesync.Mesas.entity.Zona;
import servesync.Mesas.repository.ZonaRepository;

import java.util.List;


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
