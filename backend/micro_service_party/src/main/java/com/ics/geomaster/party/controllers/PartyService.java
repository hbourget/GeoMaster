package com.ics.geomaster.party.controllers;
import com.ics.geomaster.party.models.Party;
import com.ics.geomaster.party.models.PartyRepository;
import com.ics.geomaster.users.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class PartyService {
    @Autowired
    private PartyRepository partyRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final String userServiceUrl = "http://localhost:8081";

    public Party createParty(Integer userId) {
        try {
            ResponseEntity<User> responseEntity = restTemplate.getForEntity(userServiceUrl + "/users/" + userId, User.class);
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                Party party = new Party();
                party.setUserIds(List.of(userId));
                partyRepository.save(party);
                return party;
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }

    public Party addMember(Integer partyId, Integer userId) {
        Party party = partyRepository.findById(partyId).get();
        List<Integer> userIds = party.getUserIds();

        try {
            ResponseEntity<User> responseEntity = restTemplate.getForEntity(userServiceUrl + "/users/" + userId, User.class);
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                userIds.add(userId);
                party.setUserIds(userIds);
                partyRepository.save(party);
                return party;
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }

    public Party removeMember(Integer partyId, Integer userId) {
        try {
            Party party = partyRepository.findById(partyId).get();
            List<Integer> userIds = party.getUserIds();
            userIds.remove(userId);
            party.setUserIds(userIds);
            partyRepository.save(party);
            return party;
        } catch (Exception e) {
            return null;
        }
    }

    public Party deleteParty(Integer partyId) {
        Party party = partyRepository.findById(partyId).orElse(null);
        if (party != null) {
            partyRepository.delete(party);
        }
        return party;
    }

    public Party getParty(Integer partyId) {
        return partyRepository.findById(partyId).orElse(null);
    }

    public Iterable<Party> getAllParties() {
        return partyRepository.findAll();
    }
}
