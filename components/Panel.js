import React, { Component, useState, useEffect, useRef, useCallback, useMemo } from "react";
import { fabric } from 'fabric';
import { toBN } from 'starknet/dist/utils/number'

import {
    useCivStates,
} from '../lib/api'


export default function Panel () {

    //
    // Data fetched from backend on Apibara
    //
    const { data: db_civ_states } = useCivStates ()

    //
    // React states and references
    //
    const [hasLoadedDB, setHasLoadedDB] = useState (false)
    const [historyRows, setHistoryRows] = useState ([])

    //
    // Check if all db collections are loaded
    //
    useEffect (() => {
        if (hasLoadedDB) {
            return
        }
        if (!db_civ_states) {
            console.log ('db loading ...')
            return
        }
        else {
            console.log ('db loaded!')
            setHasLoadedDB (true)
        }
    }, [hasLoadedDB, db_civ_states]);

    //
    // Set display once database collections are all loaded
    //
    useEffect (() => {
        if (hasLoadedDB) {
            var rows = []
            for (const civ_state of db_civ_states.civ_states) {
                var cells = []
                cells.push (<td style={{fontSize:'14px',textAlign:'center'}}>{`Civ. number ${civ_state.civ_idx}`}</td>)
                cells.push (<td style={{fontSize:'14px',textAlign:'left'}}>{civ_state.fate}</td>)
                rows.push (<tr>{cells}</tr>)
            }
            setHistoryRows (rows)
        }
    }, [hasLoadedDB, db_civ_states])


    return (
        <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
            <h2 style={{marginBottom:'0'}}>Isaac History</h2>
            <p style={{marginTop:'5px',marginBottom:'30px'}}>the fate of past civilizations</p>

            {/* <div style={{overflowY: 'auto', height:'300px'}}> */}
            <table>
                <thead>
                    <tr>
                        {/* <th>Civilization number</th> */}
                        {/* <th>Fate</th> */}
                    </tr>
                </thead>
                <tbody>
                    {historyRows}
                </tbody>
            </table>
            {/* </div> */}

        </div>
    );
  }