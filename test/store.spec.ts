import { store } from "../src/index";
import { expect } from "chai";
import fs from "node:fs";
import path from "path";

//TODO write test for bad working directory (e.g., DNE, non-empty)
//TODO write test for bad elementName (not conformant to rules for javascript variable name)
//TODO run checksum for contents written to disk
/*
1. select spec case
2. load model.json from spec case into memory
3. store to directory in /tmp/
4. compare checksums stored version from spec case and written version in /tmp/ and assert checksums are the same
5. load contents in directory in /tmp/
6. compare model.json from case against in-memory model loaded from /tmp/
*/
