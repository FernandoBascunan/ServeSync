package servesync.users.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import servesync.users.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByRutEmpresa(String rutEmpresa);
}
