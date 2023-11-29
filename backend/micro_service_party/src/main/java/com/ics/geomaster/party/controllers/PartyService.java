package com.ics.geomaster.party.controllers;
import com.ics.geomaster.party.models.Party;
import com.ics.geomaster.party.models.PartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class PartyService {
    @Autowired
    private PartyRepository partyRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final String userServiceUrl = "http://localhost:8081";

    public void createParty(Integer userId) {
        Party party = new Party();
        party.setUserIds(List.of(userId));
        partyRepository.save(party);
    }

    public void addMember(Integer partyId, Integer userId) {
        Party party = partyRepository.findById(partyId).get();
        List<Integer> userIds = party.getUserIds();
        userIds.add(userId);
        party.setUserIds(userIds);
        partyRepository.save(party);
    }

    public void removeMember(Integer partyId, Integer userId) {
        Party party = partyRepository.findById(partyId).get();
        List<Integer> userIds = party.getUserIds();
        userIds.remove(userId);
        party.setUserIds(userIds);
        partyRepository.save(party);
    }

    public void deleteParty(Integer partyId) {
        partyRepository.deleteById(partyId);
    }

    public Party getParty(Integer partyId) {
        Party party = partyRepository.findById(partyId).get();
        return party;
    }

    public Iterable<Party> getAllParties() {
        return partyRepository.findAll();
    }
}
