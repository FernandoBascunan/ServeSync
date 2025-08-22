package servesync.users.service;

import servesync.users.dto.*;


public interface UserService {
    UserResponse getUser(Long id);
    LoginResponse login(LoginRequest request);
    UserResponse register(RegisterRequest request);
    Boolean changePassword(PasswordRequest request);
    UserResponse editUser(RegisterRequest request);
}