import type { Character, DynastyHistoryEntry, WorldEvent } from '../types/game';

export interface SaveData {
  character: Character;
  activeExpansionId: string;
  worldEvent: WorldEvent | null;
  lineage: DynastyHistoryEntry[];
}

export interface SlotMeta {
  id: string;
  label: string;
  timestamp: number;
  generation: number;
  name: string;
  expansionId: string;
}

class SaveSystem {
  private activeSlotKey = 'legacies_active_slot';
  private slotsMetaKey = 'legacies_slots_meta';

  public getSlots(): Record<string, SlotMeta> {
    try {
      const data = localStorage.getItem(this.slotsMetaKey);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  public getActiveSlotId(): string {
    return localStorage.getItem(this.activeSlotKey) || 'slot_1';
  }

  public setActiveSlotId(slotId: string) {
    localStorage.setItem(this.activeSlotKey, slotId);
  }

  public saveGame(slotId: string, data: SaveData) {
    try {
      // Save full game data
      localStorage.setItem(`legacies_state_${slotId}`, JSON.stringify(data));

      // Update slot metadata
      const slots = this.getSlots();
      slots[slotId] = {
        id: slotId,
        label: `Gen ${data.lineage.length + 1}: ${data.character.name} ${data.character.dynastyName}`,
        timestamp: Date.now(),
        generation: data.lineage.length + 1,
        name: `${data.character.name} ${data.character.dynastyName}`,
        expansionId: data.activeExpansionId
      };
      localStorage.setItem(this.slotsMetaKey, JSON.stringify(slots));
    } catch (e) {
      console.error('Failed to save game to localStorage:', e);
    }
  }

  public loadGame(slotId: string): SaveData | null {
    try {
      const data = localStorage.getItem(`legacies_state_${slotId}`);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to load game from localStorage:', e);
      return null;
    }
  }

  public deleteSlot(slotId: string) {
    try {
      localStorage.removeItem(`legacies_state_${slotId}`);
      const slots = this.getSlots();
      delete slots[slotId];
      localStorage.setItem(this.slotsMetaKey, JSON.stringify(slots));
    } catch (e) {
      console.error('Failed to delete slot from localStorage:', e);
    }
  }

  public clearAll() {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Failed to clear localStorage:', e);
    }
  }
}

export const saveSystem = new SaveSystem();
export type { SaveSystem };
