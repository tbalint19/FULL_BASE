package com.base.coreapi.config;

import com.base.coreapi.model.admin.Admin;
import com.base.coreapi.model.admin.Permission;
import com.base.coreapi.model.calendar.Event;
import com.base.coreapi.model.calendar.OrderDay;
import com.base.coreapi.model.info.InfoType;
import com.base.coreapi.model.info.MainMessage;
import com.base.coreapi.repository.admin.AdminRepository;
import com.base.coreapi.repository.admin.PermissionRepository;
import com.base.coreapi.repository.calendar.EventRepository;
import com.base.coreapi.repository.calendar.OrderDayRepository;
import com.base.coreapi.repository.info.MainMessageRepository;
import com.base.coreapi.service.admin.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.*;

@Component
public class InitialLoader {

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private MainMessageRepository mainMessageRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private OrderDayRepository orderDayRepository;

    @Autowired
    private EventRepository eventRepository;

    @PostConstruct
    @Transactional
    public void InitialPermission() {
        Permission permission = new Permission();
        permission.setName("default-admin");
        permissionRepository.save(permission);

        Admin admin = new Admin();
        admin.setName("admin");
        admin.setEmail("toth910719balint@gmail.com");
        admin.setPassword(authService.hash("0123456789"));
        admin.setActive(true);
        adminRepository.save(admin);

        Set<Permission> permissions = new HashSet<>();
        permissions.add(permission);
        admin.setPermissions(permissions);
        adminRepository.save(admin);

        MainMessage mainMessage = new MainMessage();
        mainMessage.setTitle("Figyelem");
        mainMessage.setText("December 24-25-26 nincs rendelés!");
        mainMessage.setType(InfoType.DEFAULT);
        mainMessage.setIdentifier("only-one");
        mainMessageRepository.save(mainMessage);

        Event event_1 = new Event();
        event_1.setName("Általános rendelés");
        event_1.setAvailable(true);
        event_1.setRequiredNumberOfSpots(1);
        event_1.setOrderDays(new HashSet<>());
        eventRepository.save(event_1);

        Event event_2 = new Event();
        event_2.setName("Bárányhimlő oltás");
        event_2.setAvailable(true);
        event_2.setRequiredNumberOfSpots(1);
        event_2.setOrderDays(new HashSet<>());
        eventRepository.save(event_2);

        Event event_3 = new Event();
        event_3.setName("Valami nagyon hosszú");
        event_3.setAvailable(true);
        event_3.setRequiredNumberOfSpots(2);
        event_3.setOrderDays(new HashSet<>());
        eventRepository.save(event_3);
    }
}
