import { Component, computed, inject, Input, OnInit, signal } from "@angular/core";
import { Pokemon } from "../pokemon";
import { POKEMONS } from "../mock-pokemon-list";
import { ActivatedRoute, Router } from "@angular/router";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-PokemonDetails",
  standalone: false,
  templateUrl: "./PokemonDetails.component.html",
  styleUrls: ["./PokemonDetails.component.css"],
})
export class PokemonDetailsComponent implements OnInit {
  myPokemon: Pokemon | undefined;
  @Input() PkmName = "";
  Hp = signal(9);
  fullHp = computed(() => this.Hp() * 1000);

  readonly #pokemonService = inject(PokemonService);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    let pokemonName = this.route.snapshot.paramMap.get("name");
    if (this.PkmName != "") {
      pokemonName = this.PkmName;
    }
    if (pokemonName) {
      this.myPokemon = this.#pokemonService.getPokemonByName(pokemonName);
    }
  }

  goToPokedex() {
    this.router.navigate(["/pokemons"]);
  }
}
