package com.ics.geomaster.party.controllers;

import com.ics.geomaster.party.models.Party;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Order(1)
public class PartyCrt {
    @Autowired
    private PartyService partyService;
    public PartyCrt(PartyService partyService) {
        this.partyService = partyService;
    }

    @PostMapping("/parties/create/{userId}")
    public ResponseEntity<Party> createParty(@PathVariable Integer userId) {
        Party party = partyService.createParty(userId);
        if (party == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(party, HttpStatus.OK);
    }

    @PutMapping("/parties/{partyId}/add/{userId}")
    public ResponseEntity<Party> addMember(@PathVariable Integer partyId, @PathVariable Integer userId) {
        Party party = partyService.addMember(partyId, userId);
        if (party == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(party, HttpStatus.OK);
    }

    @PutMapping("/parties/{partyId}/remove/{userId}")
    public ResponseEntity<Party> removeMember(@PathVariable Integer partyId, @PathVariable Integer userId) {
        Party party = partyService.removeMember(partyId, userId);
        if (party == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(party, HttpStatus.OK);
    }

    @DeleteMapping("/parties/{partyId}")
    public ResponseEntity<Party> deleteParty(@PathVariable Integer partyId) {
        Party party = partyService.deleteParty(partyId);
        if (party == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(party, HttpStatus.OK);
    }

    @GetMapping("/parties/{partyId}")
    public ResponseEntity<Party> getParty(@PathVariable Integer partyId) {
        Party party = partyService.getParty(partyId);
        if (party == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(party, HttpStatus.OK);
    }

    @GetMapping("/parties")
    public ResponseEntity<Iterable<Party>> getAllParties() {
        Iterable<Party> parties = partyService.getAllParties();
        return new ResponseEntity<>(parties, HttpStatus.OK);
    }
}


