import random

def fake_plot_price_prediction(area_number, plot_dimensions, distance_from_main_road, amenities_count, khata_preference):
    # Sample area prices in Bangalore (in ₹ per SQ. FT.)
    area_prices = {1: ('East-Bengaluru', 6030), 2: ('North-Bangalore', 8165), 3: ('South-Bangalore', 4870),
                   4: ('Whitefield', 6300), 5: ('Sarjapur-Road', 5200), 6: ('Devanahalli', 5300),
                   7: ('Yelahanka', 5500), 8: ('Electronic-City', 4700), 9: ('Kanakapura-Road', 7000),
                   10: ('Sarjapur', 3500), 11: ('Bannerghatta-Road', 5000), 12: ('Hennur-Road', 4800),
                   13: ('Hebbal', 6700), 14: ('Jakkur', 6000), 15: ('Thanisandra', 5800), 16: ('JP-Nagar', 6500),
                   17: ('Old-Madras-Road', 4800), 18: ('Koramangala', 10300), 19: ('Banashankari', 8700),
                   20: ('Mysore-Road', 4900), 21: ('Hosur-Road', 4800), 22: ('Budigere', 5200), 23: ('Gunjur', 4800),
                   24: ('Tumkur-Road', 5900), 25: ('Marathahalli', 7300), 26: ('Hoskote', 3350), 27: ('Rajaji-Nagar', 12000),
                   28: ('Kengeri', 4200), 29: ('Begur', 4500), 30: ('Attibele', 3400), 31: ('Bellandur', 7500),
                   32: ('Hosa-Road', 5000), 33: ('Jalahalli', 6500), 34: ('Binnypet', 6800), 35: ('Magadi-Road', 5500),
                   36: ('Hennur', 5200), 37: ('Chandapura', 3450), 38: ('Harlur-Road', 6500), 39: ('Sahakara-Nagar', 6500),
                   40: ('Mysore-Main-Road', 4900), 41: ('Horamavu', 4400), 42: ('K-R-Puram', 6130), 43: ('Yeshwanthpur', 7790),
                   44: ('Central-Bangalore', 15000), 45: ('Uttarahalli', 4800), 46: ('Panathur-Road', 3800), 47: ('Rajarajeshwari-Nagar', 4800),
                   48: ('Old-Airport-Road', 22500), 49: ('Bagalur-Main-Rd', 33500), 50: ('Anjanapura', 3400), 51: ('Mangalore', 5850),
                   52: ('Kudlu-Gate', 5900), 53: ('Mahadevapura', 3650), 54: ('Indira-Nagar', 14000), 55: ('CV-Raman-Nagar', 5200),
                   56: ('Frazer-Town', 9800), 57: ('Jayanagara', 10000), 58: ('Outer-Ring-Road', 7577), 59: ('Basavanagudi', 12500),
                   60: ('Doddaballapur-Road', 4500), 61: ('Shettigere', 4149), 62: ('Hoodi-Circle', 8099), 63: ('Nagavara', 10000),
                   64: ('Carmelram', 6600), 65: ('Kundanahalli', 5500), 66: ('Benson-Town', 14000), 67: ('RMV', 9275), 68: ('Kammanahalli', 5700),
                   69: ('Krishnarajapura', 5000), 70: ('Vidyaranyapura', 4500), 71: ('Dollars-Colony', 7400), 72: ('RT-Nagar', 9200),
                   73: ('Thippasandra', 5900), 74: ('Judicial-Layout', 43505), 75: ('Nagarabhavi', 4200), 76: ('Sudhama-Nagar', 12000),
                   77: ('Malleswaram', 10000), 78: ('Bhoganhalli', 7300), 79: ('Vasanth-Nagar', 16200), 80: ('Cooke-Town', 9500),
                   81: ('Bellary-Road', 13100), 82: ('Nandi-Hills', 3500), 83: ('Richmond-Road', 11000), 84: ('Bommasandra', 3800),
                   85: ('Residency-Road', 9500), 86: ('Hadosiddapura-Sarjapur-Road', 6740), 87: ('Yemalur', 6700), 88: ('ITPL', 8200),
                   89: ('Palace-Road', 18490), 90: ('Chikmagalur', 30000), 91: ('Mathikere', 6750), 92: ('Shanthi-Nagar', 13990),
                   93: ('Thubarahalli', 5300), 94: ('HSR-Layout', 5800)}

    # Assign weights to each Khata preference
    khata_weights = {'BDA': 30.237, 'A-Khata': 18.6478, 'B-Khata': 10.8373, 'Panchayat': 2.83427}

    # Get the base area price and name
    area_name, base_area_price = area_prices.get(area_number, ('Unknown Area', 5000))

    # Get the Khata weight based on the specified preference
    khata_weight = khata_weights.get(khata_preference, 1)

    # Calculate the estimated price using the weighted sum of features with Khata weight
    estimated_price = (
            (base_area_price * plot_dimensions) +
            (distance_from_main_road * 10.8) *
            ((amenities_count * 23) *
             (khata_weight * 9))
    )

    return area_name, estimated_price

# Initialize variables
area_number = 0
plot_dimensions = 0
distance_from_main_road = 0
amenities_count = 0
khata_preference = ''

# Example usage:
area_name, estimated_price = fake_plot_price_prediction(area_number, plot_dimensions, distance_from_main_road, amenities_count, khata_preference)

print(f'Estimated Price for {area_name}: ₹{estimated_price:.2f}')
