#include <iostream>
#include <fstream>
#include "nlohmann/json.hpp"
#include "MurmurHash2.cpp"
#include "MurmurHash3.cpp"

using json = nlohmann::json;

json generate_murmurHash2_x86_32() {
  json result;

  std::string test_strings[3][2] = {
      {"regular text 1", "I will not buy this record, it is scratched."},
      {"regular text 2", "I will not buy this tobaconnists, it is scratched."},
      {"regular text 3", "My hovercraft is full of eels."}
  };

  for (int i = 0; i < 3; i++) {
    uint32_t out{MurmurHash2(test_strings[i][1].c_str(), test_strings[i][1].size(), 0)};
    result[test_strings[i][0]] = {
      {"input", test_strings[i][1]},
      {"output", out}
    };
  }

  return result;
}

json generate_murmurHash3_x86_32() {
  json result;

  std::string test_strings[5][2] = {
      {"regular text 1", "I will not buy this record, it is scratched."},
      {"regular text 2", "I will not buy this tobaconnists, it is scratched."},
      {"regular text 2", "My hovercraft is full of eels."},
      {"using emojis", "My 🚀 is full of 🦎."},
      {"chinese characters", "吉 星 高 照"}
  };

  for (int i = 0; i < 5; i++) {
    uint32_t *out = new uint32_t[1];
    MurmurHash3_x86_32(test_strings[i][1].c_str(), test_strings[i][1].size(), 0, out);
    result[test_strings[i][0]] = {
      {"input", test_strings[i][1]},
      {"output", *out}
    };

    delete[] out;
  }

  return result;
}

json generate_murmurHash3_x86_128() {
  json result;

  std::string test_strings[5][2] = {
      {"regular text 1", "I will not buy this record, it is scratched."},
      {"regular text 2", "I will not buy this tobaconnists, it is scratched."},
      {"regular text 3", "My hovercraft is full of eels."},
      {"using emojis", "My 🚀 is full of 🦎."},
      {"chinese characters", "吉 星 高 照"}
  };

  const char *format{"%08x"};

  for (int i = 0; i < 5; i++) {
    uint32_t out[4];
    MurmurHash3_x86_128(test_strings[i][1].c_str(), test_strings[i][1].size(), 0, out);
    char string_result[128];
    int pos = 0;

    for (int j = 0; j < 4; j++) {
      pos += std::snprintf(string_result + pos, sizeof(string_result) - pos, format, out[j]);
    }

    result[test_strings[i][0]] = {
      {"input", test_strings[i][1]},
      {"output", string_result}
    };
  }

  return result;
}

json generate_murmurHash3_x64_128() {
  json result;

  std::string test_strings[5][2] = {
      {"regular text 1", "I will not buy this record, it is scratched."},
      {"regular text 2", "I will not buy this tobaconnists, it is scratched."},
      {"regular text 3", "My hovercraft is full of eels."},
      {"using emojis", "My 🚀 is full of 🦎."},
      {"chinese characters", "吉 星 高 照"}
  };

  const char *format{"%016llx"};

  for (int i = 0; i < 5; i++) {
    uint64_t out[2];
    MurmurHash3_x64_128(test_strings[i][1].c_str(), test_strings[i][1].size(), 0, out);
    char string_result[128];
    int pos = 0;

    for (int j = 0; j < 2; j++) {
      pos += std::snprintf(string_result + pos, sizeof(string_result) - pos, format, out[j]);
    }

    result[test_strings[i][0]] = {
      {"input", test_strings[i][1]},
      {"output", string_result}
    };
  }

  return result;
}

int main() {
  json result{
      {"murmurHash2_x86_32", generate_murmurHash2_x86_32()},
      {"murmurHash3_x86_32", generate_murmurHash3_x86_32()},
      {"murmurHash3_x86_128", generate_murmurHash3_x86_128()},
      {"murmurHash3_x64_128", generate_murmurHash3_x64_128()}
  };

  std::string serialized_string{result.dump(2)};

  std::string filePath{"src/reference/cpp/results.json"};
  std::ofstream data;
  data.open(filePath);
  data << serialized_string << std::endl;
  data.close();

  std::cout << "Wrote C++ hash results to " << filePath << std::endl;

  return 0;
}
