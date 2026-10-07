# LivePlay

Control **LivePlay** audio playout from [Bitfocus Companion](https://bitfocus.io/companion) using a Stream Deck, Companion Satellite, web buttons, or any other Companion control surface.

The module provides ready-made buttons for common LivePlay operations including **GO, cue playback, carts, transport control, mixer buses, PFL, master level, preview, and panic**, along with live status, countdowns, cue colors, and progress indicators.

## Requirements

- **LivePlay 2.5.0 or later**
- **Bitfocus Companion 5.0 or later**
- Network connectivity from the Companion computer to the LivePlay server
- LivePlay API port accessible from the Companion computer
  - Default: `4480`

## Getting Started

### 1. Add LivePlay to Companion

In Companion:

1. Open **Connections**.
2. Click **Add connection**.
3. Search for **LivePlay**.
4. Add the LivePlay connection.

### 2. Configure the Connection

Enter:

- **Host** — IP address or hostname of the computer running LivePlay
- **Port** — normally `4480`
- **API token** — required only if authentication is enabled in LivePlay

Once connected, Companion will automatically retrieve information about the currently loaded LivePlay project, including cues, carts, buses, colors, playback state, and other available controls.

## Authentication

LivePlay can optionally require authentication for external control.

If authentication is enabled, create an **API token** in LivePlay's Users settings and enter it in the Companion connection configuration.

LivePlay API tokens begin with:

```text
lpk1_
```

API tokens are recommended instead of using an individual operator account. A token can be revoked independently without changing a user's login credentials.

Companion stores the token using its secrets system rather than in the normal connection configuration.

> If authentication is disabled, any device that can reach LivePlay's API port may be able to control the system. Only operate LivePlay without authentication on a trusted network.

## Presets

The easiest way to build a LivePlay control surface is from the module's **Presets**.

Available presets include:

- **GO**
- **Now Playing**
- **Play Selected Cue**
- Individual **Trigger Cue** buttons for cues in the open project
- **Stop All**
- **Panic**
- **Cart Slots 1–16**
- Mixer bus **Mute**
- Mixer bus **PFL**
- **Master Gain +1 dB / -1 dB**
- **Limiter Toggle**
- **Connection Status**

Cue-related presets automatically follow LivePlay's cue names, colors, playback state, and progress.

### Cue Progress

Cue buttons use Companion 5 layered-button features to provide a visual progress indication.

While a cue is waiting, its button displays the cue's LivePlay color in a dimmed state. During playback, the button fills from left to right in the cue's full color.

This behavior is included on presets such as:

- GO
- Now Playing
- Trigger Cue
- Play Selected
- Cart Slots

The **Now Playing** preset also reflects LivePlay's end-of-cue warning state.

## Actions

The module exposes LivePlay controls for building custom buttons in addition to the supplied presets.

| Action                      | Description                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------- |
| **GO**                      | Plays the currently armed Up Next item, using the same behavior as LivePlay's GO button |
| **Play Item**               | Plays a specific cue                                                                    |
| **Stop Item**               | Stops a specific cue, optionally with a fade                                            |
| **Pause Item**              | Pauses a playing cue                                                                    |
| **Resume Item**             | Resumes a paused cue                                                                    |
| **Toggle Pause**            | Toggles a cue between playing and paused                                                |
| **Play Item by Index Path** | Plays a cue using its playlist position, such as `0` or `1,11`                          |
| **Seek Item**               | Moves playback to a specified position                                                  |
| **Stop All**                | Stops all playing cues, optionally using a specified fade                               |
| **Panic**                   | Immediately stops all playback                                                          |
| **Trigger Cart Slot**       | Triggers cart slots 1–64                                                                |
| **Arm Up Next**             | Overrides the cue armed for the next GO                                                 |
| **Preview Item**            | Plays a cue through LivePlay's preview path                                             |
| **Stop Preview**            | Stops preview playback                                                                  |
| **Load Project**            | Loads a LivePlay project on the LivePlay server                                         |
| **Close Project**           | Closes the currently loaded project                                                     |
| **Master Gain**             | Sets or adjusts the master output level                                                 |
| **Master Limiter**          | Turns the limiter on, off, or toggles its state                                         |
| **Bus Fader**               | Sets or adjusts a mixer bus level                                                       |
| **Bus Mute**                | Controls mixer bus mute                                                                 |
| **Bus PFL**                 | Controls mixer bus PFL                                                                  |
| **Clear All PFL**           | Clears active PFL selections                                                            |
| **Preview Mono**            | Controls mono audition for the preview bus                                              |

## Feedbacks

Feedbacks can be used to change button appearance based on LivePlay's current state.

Available feedbacks include:

- Connection status
- Project loaded
- Item playing
- Item paused
- Anything playing
- Cart slot active
- Limiter enabled
- Limiter actively reducing gain
- Preview active
- Bus muted
- Bus PFL active
- Preview mono enabled
- Cue color
- Cue progress
- Cue text color

Cue color feedbacks can be used to make Companion buttons automatically match the colors assigned in LivePlay.

## Variables

The module publishes LivePlay information as Companion variables for use in button text, triggers, expressions, and custom layouts.

Common variables include:

| Variable         | Description                                     |
| ---------------- | ----------------------------------------------- |
| `project_name`   | Currently loaded project                        |
| `current_item`   | Current playing cue                             |
| `elapsed`        | Elapsed playback time                           |
| `remaining`      | Remaining playback time                         |
| `duration`       | Cue duration                                    |
| `next_name`      | Up Next cue                                     |
| `master_gain`    | Current master level                            |
| `limiter`        | Limiter state                                   |
| `lufs_m`         | Momentary loudness                              |
| `lufs_s`         | Short-term loudness                             |
| `playing_count`  | Number of currently playing cues                |
| `item_count`     | Number of cues in the project                   |
| `server_version` | Connected LivePlay version                      |
| `advance_in`     | Time until an automatically advancing cue fires |

Additional variables are generated dynamically for cues, cart slots, and mixer buses.

The complete list for the current connection is available in Companion's **Variables** tab.

### Cue Variables

LivePlay exposes cue state for commonly used targets including:

- Current cue
- Up Next cue
- Selected cue
- Cart slots

For example:

```text
$(liveplay:current_progress)
$(liveplay:current_color_rgb)
$(liveplay:current_text_rgb)
```

Progress values range from:

```text
0
```

at the beginning of a cue to:

```text
255
```

at the end.

These values can be used directly with Companion 5 gauges and layered buttons.

### Cue Name Variables

Each cue in the open project receives variables that can be addressed by either its UUID or playlist position.

UUID-based:

```text
$(liveplay:item_name_<uuid>)
```

Index-based:

```text
$(liveplay:item_name_at_<index>)
```

Examples:

```text
$(liveplay:item_name_at_0)
$(liveplay:item_name_at_1_11)
```

UUID-based addressing is generally preferred for permanent control surfaces because the UUID remains associated with the cue when the playlist is rearranged.

### Mixer Bus Variables

Each mixer bus exposes variables including:

```text
bus_<id>_name
bus_<id>_gain
bus_<id>_mute
bus_<id>_pfl
```

## Building Custom Cue Buttons

For most operators, starting with the supplied **Trigger Cue** preset is recommended.

When building a button manually, a cue can be addressed by either:

- **UUID**
- **Index path**

### UUID

UUIDs remain associated with a cue when the playlist is rearranged.

Use UUID addressing for fixed buttons that should always trigger the same cue.

### Index Path

Index paths represent the cue's current position in the playlist.

Examples:

```text
0
1,11
```

Index paths are useful when a button should follow a position in the playlist rather than a specific cue.

## Operator Notes

### A cue may stop another playing cue

LivePlay determines how simultaneous playback is handled.

For example, if the project's playback behavior is configured to stop existing playback when another cue is fired, triggering a cue from Companion will produce the same result as triggering it directly in LivePlay.

### Cues may not be immediately available after loading a project

When a project is first opened, LivePlay may still be loading audio into the playback engine.

If a cue is triggered before it has finished loading, LivePlay may reject the command with:

```text
item not loaded into engine
```

Companion records this as a warning.

### Prefer UUIDs for permanent buttons

For control surfaces designed around specific cues, use cue UUIDs whenever possible.

Playlist index paths can change when cues are inserted, removed, or rearranged.

## Troubleshooting

### Companion will not connect

Check:

- LivePlay is running.
- The correct LivePlay IP address or hostname is configured.
- The API port is correct.
- The Companion computer can reach the LivePlay computer over the network.
- A firewall is not blocking the LivePlay API port.
- The API token is correct if authentication is enabled.

The default API port is:

```text
4480
```

### Companion reports an unsupported server version

LivePlay **2.5.0 or later** is required.

Older versions are intentionally rejected by the module.

### Buttons do not update after opening a project

Allow LivePlay a moment to finish loading the project. Cue, cart, bus, variable, and preset information is populated from the currently open LivePlay project.

### A button triggers the wrong cue after the playlist was edited

If the button uses an **index path**, its target may have moved.

For permanent cue buttons, change the action to use the cue's **UUID** instead.

## License

[MIT](LICENSE)
