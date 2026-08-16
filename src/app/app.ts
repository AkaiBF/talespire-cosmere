import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface CharacterSheet {
  playerName: string;
  characterName: string;
  level: number;
  pathsAncestry: string;
  spheres: string;

  physicalDefense: number;
  strength: number;
  speed: number;
  healthMax: number;
  healthCurrent: number;
  deflect: number;

  cognitiveDefense: number;
  intellect: number;
  willpower: number;
  focusMax: number;
  focusCurrent: number;

  spiritualDefense: number;
  awareness: number;
  presence: number;
  investitureMax: number;
  investitureCurrent: number;

  agility: number;
  athletics: number;
  heavyWeapons: number;
  lightWeapons: number;
  stealth: number;
  thievery: number;
  physicalOther: number;

  crafting: number;
  deduction: number;
  discipline: number;
  intimidation: number;
  lore: number;
  medicine: number;
  cognitiveOther: number;

  deception: number;
  insight: number;
  leadership: number;
  perception: number;
  persuasion: number;
  survival: number;
  spiritualOther: number;

  liftingCapacity: string;
  movement: string;
  recoveryDie: string;
  sensesRange: string;

  expertises: string;
  weaponsTalents: string;
  conditionsInjuries: string;
  pageOneNotes: string;

  purposeObstacle: string;

  goals: string;
  characterAppearance: string;
  connections: string;
  armorEquipment: string;
  notesLeft: string;
  notesRight: string;
  portraitAssetId?: string;
}

type OtherSkillNames = [string, string, string];
type SkillField =
  | 'agility'
  | 'athletics'
  | 'heavyWeapons'
  | 'lightWeapons'
  | 'stealth'
  | 'thievery'
  | 'physicalOther'
  | 'crafting'
  | 'deduction'
  | 'discipline'
  | 'intimidation'
  | 'lore'
  | 'medicine'
  | 'cognitiveOther'
  | 'deception'
  | 'insight'
  | 'leadership'
  | 'perception'
  | 'persuasion'
  | 'survival'
  | 'spiritualOther';

interface Skill {
  field: SkillField;
  label: string;
}

const CHARACTER_SHEET_FIELDS = [
  'playerName',
  'characterName',
  'level',
  'pathsAncestry',
  'spheres',
  'physicalDefense',
  'strength',
  'speed',
  'healthMax',
  'healthCurrent',
  'deflect',
  'cognitiveDefense',
  'intellect',
  'willpower',
  'focusMax',
  'focusCurrent',
  'spiritualDefense',
  'awareness',
  'presence',
  'investitureMax',
  'investitureCurrent',
  'agility',
  'athletics',
  'heavyWeapons',
  'lightWeapons',
  'stealth',
  'thievery',
  'physicalOther',
  'crafting',
  'deduction',
  'discipline',
  'intimidation',
  'lore',
  'medicine',
  'cognitiveOther',
  'deception',
  'insight',
  'leadership',
  'perception',
  'persuasion',
  'survival',
  'spiritualOther',
  'liftingCapacity',
  'movement',
  'recoveryDie',
  'sensesRange',
  'expertises',
  'weaponsTalents',
  'conditionsInjuries',
  'pageOneNotes',
  'purposeObstacle',
  'goals',
  'characterAppearance',
  'connections',
  'armorEquipment',
  'notesLeft',
  'notesRight'
] as const;

const CHARACTER_SHEET_NUMBER_FIELDS = [
  'level',
  'physicalDefense',
  'strength',
  'speed',
  'healthMax',
  'healthCurrent',
  'deflect',
  'cognitiveDefense',
  'intellect',
  'willpower',
  'focusMax',
  'focusCurrent',
  'spiritualDefense',
  'awareness',
  'presence',
  'investitureMax',
  'investitureCurrent',
  'agility',
  'athletics',
  'heavyWeapons',
  'lightWeapons',
  'stealth',
  'thievery',
  'physicalOther',
  'crafting',
  'deduction',
  'discipline',
  'intimidation',
  'lore',
  'medicine',
  'cognitiveOther',
  'deception',
  'insight',
  'leadership',
  'perception',
  'persuasion',
  'survival',
  'spiritualOther'
] as const;

const createCharacterSheet = (overrides: Partial<CharacterSheet> = {}): CharacterSheet => ({
  playerName: "Laura R.",
  characterName: "Kaladin Stormblessed",
  level: 6,
  pathsAncestry: "Protector / Bridgeleader - Alethi",
  spheres: "84 broams",

  physicalDefense: 13,
  strength: 4,
  speed: 3,
  healthMax: 48,
  healthCurrent: 42,
  deflect: 2,

  cognitiveDefense: 12,
  intellect: 2,
  willpower: 4,
  focusMax: 34,
  focusCurrent: 30,

  spiritualDefense: 11,
  awareness: 3,
  presence: 2,
  investitureMax: 10,
  investitureCurrent: 7,

  agility: 5,
  athletics: 4,
  heavyWeapons: 3,
  lightWeapons: 5,
  stealth: 3,
  thievery: 1,
  physicalOther: 2,

  crafting: 1,
  deduction: 3,
  discipline: 5,
  intimidation: 3,
  lore: 2,
  medicine: 2,
  cognitiveOther: 2,

  deception: 1,
  insight: 4,
  leadership: 4,
  perception: 4,
  persuasion: 2,
  survival: 5,
  spiritualOther: 2,

  liftingCapacity: "Heavy",
  movement: "30 ft",
  recoveryDie: "d8",
  sensesRange: "60 ft",

  expertises: "Spear fighting\nShield wall tactics\nMountain survival",
  weaponsTalents: "Windrunner Training: reroll 1 failed attack/scene\nLashing Strike: +2 damage when airborne",
  conditionsInjuries: "Left forearm bruised\nFatigued (minor)",
  pageOneNotes: "Keeps his squad alive first.\nAvoids needless casualties.",

  purposeObstacle: "Protect the vulnerable / Haunted by battlefield losses",

  goals: "Short term: Keep Bridge Four safe.\nLong term: Become worthy of the Ideals.",
  characterAppearance: "Tall, dark-haired Alethi in blue uniform, spear at his back, focused gaze.",
  connections: "Bridge Four\nSyl\nDalinar Kholin",
  armorEquipment: "Spear, side knife, infused spheres, light armor, field kit",
  notesLeft: "Trust is earned in the field.",
  notesRight: "Stormlight reserved for emergencies.",
  portraitAssetId: "",
  ...overrides
});

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  @ViewChild('portraitContainer', { static: false })
  portraitContainer?: ElementRef<HTMLDivElement>;

  initialized: boolean = false;
  showJsonImporter: boolean = false;
  jsonImportText: string = '';
  importStatusText: string = '';

  readonly characterSheet: CharacterSheet = createCharacterSheet();

  readonly otherSkillNames: OtherSkillNames = ["Siegecraft", "Scholarship", "Streetwise"];

  constructor() {
    window.handleSymbioteState = this.handleSymbioteState.bind(this);
    this.jsonImportText = JSON.stringify(this.characterSheet, null, 2);
  }

  appendLog(_message: string): void {
    // Logging intentionally disabled.
  }
  protected readonly title = signal('StormlightArchiveCharacterSheet');

  private get TS(): any {
    return window.TS ?? window.com?.bouncyrock?.talespire;
  }

  loadCurrentSheetJson(): void {
    this.jsonImportText = JSON.stringify(this.characterSheet, null, 2);
    this.importStatusText = 'JSON actual generado desde la hoja.';
  }

  toggleJsonImporter(): void {
    this.showJsonImporter = !this.showJsonImporter;
  }

  importCharacterSheetFromJson(): void {
    const source = this.jsonImportText.trim();

    if (!source) {
      this.importStatusText = 'El texto JSON esta vacio.';
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(source);
    } catch {
      this.importStatusText = 'JSON invalido. Revisa comas, llaves y comillas.';
      return;
    }

    const validationErrors = this.validateCharacterSheet(parsed);
    if (validationErrors.length > 0) {
      this.importStatusText = `No se pudo importar: ${validationErrors.join(' | ')}`;
      return;
    }

    const importedSheet = parsed as CharacterSheet;
    Object.assign(this.characterSheet, importedSheet);
    if (this.characterSheet.portraitAssetId) {
      this.setPortraitPreview();
    }

    this.importStatusText = `Importacion completada: ${this.characterSheet['characterName']}.`;
  }

  private validateCharacterSheet(value: unknown): string[] {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return ['El JSON debe ser un objeto.'];
    }

    const candidate = value as Record<string, unknown>;
    const errors: string[] = [];

    for (const field of CHARACTER_SHEET_FIELDS) {
      if (!(field in candidate)) {
        errors.push(`Falta el campo '${field}'.`);
      }
    }

    for (const field of CHARACTER_SHEET_NUMBER_FIELDS) {
      const fieldValue = candidate[field];
      if (typeof fieldValue !== 'number' || Number.isNaN(fieldValue)) {
        errors.push(`'${field}' debe ser numero.`);
      }
    }

    if (typeof candidate['playerName'] !== 'string') {
      errors.push(`'playerName' debe ser texto.`);
    }
    if (typeof candidate['characterName'] !== 'string') {
      errors.push(`'characterName' debe ser texto.`);
    }

    return errors.slice(0, 8);
  }

  async rollSkill(skill: Skill): Promise<void> {
    try {
      if (!this.TS || !this.initialized) {
        return;
      }

      const skillBonus = this.characterSheet[skill.field];
      const bonusValue = typeof skillBonus === 'number' ? skillBonus : 0;
      const bonus = bonusValue >= 0 ? `+${bonusValue}` : bonusValue.toString();
      const descriptors = await this.TS.dice.makeRollDescriptors(`1d20${bonus}`);
      descriptors[0].name = skill.label;

      await this.TS.dice.putDiceInTray(descriptors, false);
    } catch (error: any) { }
  }

  onSkillLabelClick(field: SkillField, label: string): void {
    this.rollSkill({ field, label });
  }

  async captureSelectedAssetId(): Promise<void> {
    try {
      if (!this.TS || !this.initialized) {
        this.importStatusText = 'TaleSpire aun no esta inicializado.';
        return;
      }

      const selected = await this.TS.creatures.getSelectedCreatures();
      if (!selected?.length) {
        this.importStatusText = 'Selecciona una criatura para capturar el Asset ID.';
        return;
      }

      const info = await this.TS.creatures.getMoreInfo(selected);
      const activeMorph = info?.[0]?.morphs?.[info?.[0]?.activeMorphIndex];
      const assetId = activeMorph?.boardAssetId as string | undefined;

      if (!assetId) {
        this.importStatusText = 'No se pudo obtener el Asset ID de la mini seleccionada.';
        return;
      }

      this.characterSheet.portraitAssetId = assetId;
      this.importStatusText = 'Asset ID capturado desde la mini seleccionada.';
      await this.setPortraitPreview();
    } catch (error: any) {
      this.importStatusText = 'Error al capturar Asset ID: ' + (error?.message ?? error);
    }
  }

  async setPortraitPreview(): Promise<void> {
    const portraitAssetId = this.characterSheet.portraitAssetId?.trim();
    if (!portraitAssetId) {
      this.importStatusText = 'Escribe un Asset ID para el portrait.';
      return;
    }

    try {
      const packs = await this.TS.contentPacks.getContentPacks();
      const packsInfo = await this.TS.contentPacks.getMoreInfo(packs);

      const boardObjectInfo = await this.TS.contentPacks.findBoardObjectInPacks(
        portraitAssetId,
        packsInfo
      );

      const thumbnailElement = await this.TS.contentPacks.createThumbnailElementForBoardObject(
        boardObjectInfo.boardObject,
        128
      );

      const container = this.portraitContainer?.nativeElement;
      if (!container) {
        return;
      }

      container.innerHTML = '';
      container.appendChild(thumbnailElement);
      this.importStatusText = 'Portrait actualizado.';
    } catch (error: any) {
      this.importStatusText = 'Error al renderizar portrait: ' + (error?.message ?? error);
    }
  }

  async spawnFigure(): Promise<void> {
    const portraitAssetId = this.characterSheet.portraitAssetId?.trim();
    if (!portraitAssetId) {
      this.importStatusText = 'Define un Asset ID para spawnear la figura.';
      return;
    }

    try {
      if (!this.TS || !this.initialized) {
        this.importStatusText = 'TaleSpire aun no esta inicializado.';
        return;
      }

      const board = await this.TS.boards.whereAmI();
      const creatureInfo = {
        id: "",
        isUnique: false,
        name: this.characterSheet.characterName || 'Stormlight Character',
        nameSet: true,
        link: '',
        position: { locId: 1, x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        boardId: board.id,
        morphs: [
          {
            boardAssetId: portraitAssetId,
            scale: 1
          }
        ],
        activeMorphIndex: 0,
        hp: {
          name: 'hp',
          value: this.characterSheet.healthCurrent,
          max: this.characterSheet.healthMax
        },
        stats: [
          { name: 'STR', value: this.characterSheet.strength, max: 24 },
          { name: 'SPD', value: this.characterSheet.speed, max: 24 },
          { name: 'INT', value: this.characterSheet.intellect, max: 24 },
          { name: 'WIL', value: this.characterSheet.willpower, max: 24 },
          { name: 'AWA', value: this.characterSheet.awareness, max: 24 },
          { name: 'PRE', value: this.characterSheet.presence, max: 24 },
          { name: 'Stat 7', value: 0, max: 24 },
          { name: 'Stat 8', value: 0, max: 24 }
        ],
        torchIsOn: false,
        isExplicitlyHidden: false,
        isFlying: false,
        idsOfActivePersistentEmotes: [],
        ownerIds: []
      };

      const blueprintUrl = await this.TS.creatures.createBlueprint(creatureInfo);
      await this.TS.urls.submit(blueprintUrl);
      this.importStatusText = 'Figura spawneada en TaleSpire.';
    } catch (error: any) {
      this.importStatusText = 'Error al spawnear figura: ' + (error?.message ?? error);
    }
  }

  handleSymbioteState(event: any): void {
    this.appendLog('Symbiote event: ' + JSON.stringify(event));

    if (event?.kind === 'hasInitialized' || event?.type === 'hasInitialized') {
      this.initialized = true;
      this.appendLog('TaleSpire initialized');
    }
  }

  async roll(): Promise<void> {
    try {

      if (!this.TS) {
        this.appendLog("TaleSpire API not available.");
        return;
      }


      if (!this.initialized) {
        return;
      }

      const descriptors = await this.TS.dice.makeRollDescriptors("1d20");
      descriptors[0].name = "AGILITY (SPD)";
      this.appendLog(JSON.stringify(descriptors));

      const rollId = await this.TS.dice.putDiceInTray(descriptors, false);
      this.appendLog("putDiceInTray resolved: " + rollId);
    } catch (error: any) {
      this.appendLog("Error rolling dice: " + (error?.message ?? error));
      console.error(error);
    }

  }
}
