import { combineRgb } from '@companion-module/base'
import type ModuleInstance from './main.js'
import { busOption } from './actions.js'
import { parseIndexPath } from './liveplay.js'
import { PROGRESS_MAX } from './state.js'
import { itemGauge, type ItemGauge } from './variables.js'

export type FeedbacksSchema = {
	connected: { type: 'boolean'; options: Record<string, never> }
	project_loaded: { type: 'boolean'; options: Record<string, never> }
	item_playing: { type: 'boolean'; options: { uuid: string } }
	item_paused: { type: 'boolean'; options: { uuid: string } }
	anything_playing: { type: 'boolean'; options: Record<string, never> }
	cart_active: { type: 'boolean'; options: { slot: number } }
	limiter_enabled: { type: 'boolean'; options: Record<string, never> }
	limiter_engaged: { type: 'boolean'; options: Record<string, never> }
	preview_active: { type: 'boolean'; options: Record<string, never> }
	show_mode: { type: 'boolean'; options: Record<string, never> }
	item_selected: { type: 'boolean'; options: { uuid: string } }
	item_is_next: { type: 'boolean'; options: { uuid: string } }
	bus_muted: { type: 'boolean'; options: { bus: string } }
	bus_pfl: { type: 'boolean'; options: { bus: string } }
	preview_mono: { type: 'boolean'; options: Record<string, never> }
	cue_progress: { type: 'value'; options: { cue: string } }
	cue_color_rgb: { type: 'value'; options: { cue: string } }
	cue_text_rgb: { type: 'value'; options: { cue: string } }
	cue_name: { type: 'value'; options: { cue: string } }
	cue_state: { type: 'value'; options: { cue: string } }
	cart_progress: { type: 'value'; options: { slot: number } }
	cart_color_rgb: { type: 'value'; options: { slot: number } }
	cart_text_rgb: { type: 'value'; options: { slot: number } }
	cart_name: { type: 'value'; options: { slot: number } }
}

/** The value feedbacks behind every Trigger Cue gauge; main.ts re-checks them as playback moves. */
export const CUE_GAUGE_FEEDBACKS = ['cue_progress', 'cue_color_rgb', 'cue_text_rgb', 'cue_name', 'cue_state'] as const

/** The same for a cart slot addressed by number. */
export const CART_GAUGE_FEEDBACKS = ['cart_progress', 'cart_color_rgb', 'cart_text_rgb', 'cart_name'] as const

const UUID_TOOLTIP = 'The item UUID from the LivePlay project.'

/** The "which cue" option shared by the cue feedbacks. */
const cueOption = {
	id: 'cue' as const,
	type: 'textinput' as const,
	label: 'Cue (UUID or index path)',
	tooltip: 'An item UUID, or a 0-based index path such as "2,35". Variables such as $(local:index) work too.',
	default: '',
	useVariables: true,
}

/** A cue option (UUID or index path) as an item uuid; '' when it names nothing. */
function resolveCue(self: ModuleInstance, raw: string): string {
	const text = raw.trim()
	const index = parseIndexPath(text)
	return index ? self.state.uuidAtIndex(index) : text
}

/** The "which cart slot" option shared by the cart feedbacks. */
const cartSlotOption = {
	id: 'slot' as const,
	type: 'number' as const,
	label: 'Slot (1-64)',
	tooltip: 'Cart slot as shown in the LivePlay UI (1-based).',
	default: 1,
	min: 1,
	max: 64,
}

/** Gauge inputs for the item loaded into a 1-based cart slot (an empty slot draws as no item). */
function cartGauge(self: ModuleInstance, slot: number): ItemGauge {
	const bound = self.state.cart.get(slot - 1)
	return itemGauge(self.state, bound?.itemUuid ?? '', bound?.color)
}

export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		connected: {
			name: 'Connected to LivePlay',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 102, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => self.connected,
		},
		project_loaded: {
			name: 'Project loaded',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 51, 102),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => self.state.hasOpenProject,
		},
		item_playing: {
			name: 'Item is playing',
			description: 'True while the item is sounding (playing or fading). Paused items are not "playing".',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 204, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{ id: 'uuid', type: 'textinput', label: 'Item UUID', tooltip: UUID_TOOLTIP, default: '', useVariables: true },
			],
			callback: (feedback) => self.state.isAudible(feedback.options.uuid.trim()),
		},
		item_paused: {
			name: 'Item is paused',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(255, 153, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{ id: 'uuid', type: 'textinput', label: 'Item UUID', tooltip: UUID_TOOLTIP, default: '', useVariables: true },
			],
			callback: (feedback) => self.state.isPaused(feedback.options.uuid.trim()),
		},
		anything_playing: {
			name: 'Anything is playing',
			description: 'True while at least one item is sounding (paused items do not count).',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 204, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => self.state.anythingAudible(),
		},
		cart_active: {
			name: 'Cart slot is playing',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 204, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [cartSlotOption],
			callback: (feedback) => self.state.isCartSlotActive(feedback.options.slot - 1),
		},
		limiter_enabled: {
			name: 'Limiter enabled',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 102, 153),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => self.state.limiterEnabled,
		},
		limiter_engaged: {
			name: 'Limiter engaged (reducing gain)',
			description: 'True while the limiter is actively reducing the master output level.',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(204, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => self.state.limiterEngaged,
		},
		preview_active: {
			name: 'Preview (pre-listen) active',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(153, 51, 204),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => self.state.previewActive,
		},
		show_mode: {
			name: 'Show Mode is on',
			description: 'True while LivePlay is in the simplified, touch-friendly playback view.',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(153, 51, 204),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => self.state.showMode,
		},
		item_selected: {
			name: 'Item is selected',
			description: 'True while this item is the one selected in the LivePlay playlist.',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(51, 51, 51),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{ id: 'uuid', type: 'textinput', label: 'Item UUID', tooltip: UUID_TOOLTIP, default: '', useVariables: true },
			],
			callback: (feedback) => {
				const uuid = feedback.options.uuid.trim()
				return uuid !== '' && self.state.selection?.itemUuid === uuid
			},
		},
		item_is_next: {
			name: 'Item is armed as Up Next',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(255, 153, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{ id: 'uuid', type: 'textinput', label: 'Item UUID', tooltip: UUID_TOOLTIP, default: '', useVariables: true },
			],
			callback: (feedback) => {
				const uuid = feedback.options.uuid.trim()
				return uuid !== '' && self.state.next?.itemUuid === uuid
			},
		},
		bus_muted: {
			name: 'Bus is muted',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(204, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [busOption(self)],
			callback: (feedback) => self.state.resolveBus(String(feedback.options.bus))?.mute ?? false,
		},
		bus_pfl: {
			name: 'Bus PFL is on',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(255, 193, 7),
				color: combineRgb(0, 0, 0),
			},
			options: [busOption(self)],
			callback: (feedback) => self.state.resolveBus(String(feedback.options.bus))?.pfl ?? false,
		},
		preview_mono: {
			name: 'Preview mono audition is on',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(255, 193, 7),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => self.state.previewMono,
		},

		// ---- Cue gauge values --------------------------------------------
		// Value feedbacks that feed a button's local variables, which in turn
		// drive its gauge and label. They take the cue as an option — a UUID,
		// an index path, or a variable such as $(local:index) — so one button
		// can be pointed anywhere, and a show with hundreds of cues doesn't need
		// hundreds of extra global variables.
		cue_progress: {
			name: 'Cue progress (value, for gauges)',
			description: `How far through a cue is, 0 (start) to ${PROGRESS_MAX} (end). 0 while it is not on air.`,
			type: 'value',
			options: [cueOption],
			callback: (feedback) => itemGauge(self.state, resolveCue(self, feedback.options.cue)).progress,
		},
		cue_color_rgb: {
			name: 'Cue color (value, for gauges)',
			description: 'The cue’s own color as a packed RGB number — the form gauge colors need.',
			type: 'value',
			options: [cueOption],
			callback: (feedback) => itemGauge(self.state, resolveCue(self, feedback.options.cue)).fill,
		},
		cue_text_rgb: {
			name: 'Cue text color (value, for gauges)',
			description: 'Black or white as a packed RGB number, whichever reads over the cue’s gauge.',
			type: 'value',
			options: [cueOption],
			callback: (feedback) => itemGauge(self.state, resolveCue(self, feedback.options.cue)).text,
		},
		cue_name: {
			name: 'Cue name (value)',
			description:
				'The cue’s current name. A cue that cannot be found shows what was typed, so a wrong target reads as wrong.',
			type: 'value',
			options: [cueOption],
			callback: (feedback) => {
				const raw = feedback.options.cue.trim()
				const uuid = resolveCue(self, raw)
				return (uuid && self.state.itemName(uuid)) || raw
			},
		},
		cue_state: {
			name: 'Cue state (value)',
			description:
				'"playing" while the cue sounds (fades included), "paused" while it is held, blank otherwise. For expressions, e.g. a fill that turns green while the cue plays.',
			type: 'value',
			options: [cueOption],
			callback: (feedback) => {
				const uuid = resolveCue(self, feedback.options.cue)
				if (uuid && self.state.isAudible(uuid)) return 'playing'
				if (uuid && self.state.isPaused(uuid)) return 'paused'
				return ''
			},
		},

		// ---- Cart slot gauge values ---------------------------------------
		// The cart_<n>_* variables cover the 16 pads of the cart wall; these
		// reach any slot LivePlay accepts, through a button local variable.
		cart_progress: {
			name: 'Cart slot progress (value, for gauges)',
			description: `How far through the slot's cue is, 0 (start) to ${PROGRESS_MAX} (end). 0 while it is not on air.`,
			type: 'value',
			options: [cartSlotOption],
			callback: (feedback) => cartGauge(self, feedback.options.slot).progress,
		},
		cart_color_rgb: {
			name: 'Cart slot color (value, for gauges)',
			description: 'The color of the cue loaded into the slot, as a packed RGB number. Neutral when the slot is empty.',
			type: 'value',
			options: [cartSlotOption],
			callback: (feedback) => cartGauge(self, feedback.options.slot).fill,
		},
		cart_text_rgb: {
			name: 'Cart slot text color (value, for gauges)',
			description: 'Black or white as a packed RGB number, whichever reads over the slot’s gauge.',
			type: 'value',
			options: [cartSlotOption],
			callback: (feedback) => cartGauge(self, feedback.options.slot).text,
		},
		cart_name: {
			name: 'Cart slot name (value)',
			description: 'The name of the cue loaded into the slot, or the slot number when it is empty.',
			type: 'value',
			options: [cartSlotOption],
			callback: (feedback) => self.state.cart.get(feedback.options.slot - 1)?.name || String(feedback.options.slot),
		},
	})
}
