import json

with open('static/data/ap_state.json', 'r') as f:
    data = json.load(f)

# MultiPolygon coordinates
coords = data['features'][0]['geometry']['coordinates']

all_points = []
for poly in coords:
    for ring in poly:
        all_points.extend(ring)

# The AP/TG border is roughly longitudes < 81.3 and latitudes > 16.0 
# Actually, the border is a contiguous sequence in one of the rings.
# Let's find the longest ring.
longest_ring = max([ring for poly in coords for ring in poly], key=len)

# The AP/TG boundary starts near (81.2, 17.7) and ends near (77.5, 15.8)
# Let's find points in longest_ring that fall in the bounding box of the inner border:
# We know the inner border is far from the coast. Coast is long > 80.0 and lat < 18.0 roughly.

# Just export the whole ring to a simplified list, we'll manually take a slice.
# We'll calculate the bounding box.
# AP/TG border bounding box roughly: lon 77.0 to 81.5, lat 15.7 to 17.8
# The coast is on the East (lon > 80.0) but goes South.
# A simpler way: we output the ring points and find the continuous segment 
# whose distance to coast is large. But we don't have coast data here.

# Let's just output every 5th point of the longest ring to a file, and we can inspect it.
segment = []
for pt in longest_ring:
    lon, lat = pt
    # rough heuristic for inner border:
    # it's roughly a line from 81.3, 17.7 down to 77.5, 15.8
    # y ≈ 0.5 * x - 23 
    # let's just dump the segment between lon 77.4 and 81.4
    if 77.4 <= lon <= 81.4 and 15.7 <= lat <= 17.8:
        segment.append(pt)

# Because it's a ring, the points in the bounding box might be from two different sides (coast vs inland).
# But wait, AP coast is also in that lat/lon range! Coast longitudes are higher.
# Let's keep points where lon < 80.0 OR (lat > 16.5 and lon < 81.5).

filtered = []
for lon, lat in longest_ring:
    if lon < 80.0:
        filtered.append([lon, lat])
    elif 16.5 < lat < 18.0 and lon < 81.5:
        filtered.append([lon, lat])

with open('filtered_border.json', 'w') as f:
    json.dump(filtered, f)

