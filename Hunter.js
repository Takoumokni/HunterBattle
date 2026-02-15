 // Nen type advantages and characteristics
        const NEN_TYPES = {
            Enhancer: {
                description: "Masters of physical enhancement and healing",
                strengths: ["High durability", "Strong physical attacks"],
                advantage: "Transmuter",
                disadvantage: "Conjurer"
            },
            Transmuter: {
                description: "Change the properties of their aura",
                strengths: ["Versatile abilities", "Unpredictable"],
                advantage: "Conjurer",
                disadvantage: "Specialist"
            },
            Emitter: {
                description: "Detach aura from their body",
                strengths: ["Ranged attacks", "Aura projection"],
                advantage: "Manipulator",
                disadvantage: "Transmuter"
            },
            Conjurer: {
                description: "Create physical objects from aura",
                strengths: ["Material creation", "Special weapons"],
                advantage: "Specialist",
                disadvantage: "Enhancer"
            },
            Manipulator: {
                description: "Control objects and living things",
                strengths: ["Control abilities", "Strategic combat"],
                advantage: "Enhancer",
                disadvantage: "Emitter"
            },
            Specialist: {
                description: "Unique abilities outside other categories",
                strengths: ["Unique powers", "Unpredictable"],
                advantage: "Emitter",
                disadvantage: "Manipulator"
            }
        };

        // Preset fighters
        const PRESETS = {
            gon: {
                id: 1,
                name: "Gon Freecss",
                nenType: "Enhancer",
                baseStats: {
                    strength: 85,
                    speed: 90,
                    durability: 80,
                    intelligence: 65,
                    auraCapacity: 95,
                    auraControl: 70,
                    experience: 75
                }
            },
            killua: {
                id: 2,
                name: "Killua Zoldyck",
                nenType: "Transmuter",
                baseStats: {
                    strength: 80,
                    speed: 98,
                    durability: 75,
                    intelligence: 95,
                    auraCapacity: 85,
                    auraControl: 90,
                    experience: 85
                }
            },
            kurapika: {
                id: 3,
                name: "Kurapika",
                nenType: "Conjurer",
                baseStats: {
                    strength: 70,
                    speed: 75,
                    durability: 70,
                    intelligence: 98,
                    auraCapacity: 80,
                    auraControl: 95,
                    experience: 80
                }
            },
            hisoka: {
                id: 4,
                name: "Hisoka Morow",
                nenType: "Transmuter",
                baseStats: {
                    strength: 88,
                    speed: 92,
                    durability: 85,
                    intelligence: 90,
                    auraCapacity: 90,
                    auraControl: 88,
                    experience: 95
                }
            },
            chrollo: {
                id: 5,
                name: "Chrollo Lucilfer",
                nenType: "Specialist",
                baseStats: {
                    strength: 82,
                    speed: 85,
                    durability: 80,
                    intelligence: 99,
                    auraCapacity: 92,
                    auraControl: 95,
                    experience: 98
                }
            },
            netero: {
                id: 6,
                name: "Isaac Netero",
                nenType: "Enhancer",
                baseStats: {
                    strength: 90,
                    speed: 99,
                    durability: 88,
                    intelligence: 95,
                    auraCapacity: 100,
                    auraControl: 100,
                    experience: 100
                }
            },
            meruem: {
                id: 7,
                name: "Meruem",
                nenType: "Specialist",
                baseStats: {
                    strength: 100,
                    speed: 100,
                    durability: 100,
                    intelligence: 100,
                    auraCapacity: 100,
                    auraControl: 95,
                    experience: 70
                }
            },
            pitou: {
                id: 8,
                name: "Neferpitou",
                nenType: "Specialist",
                baseStats: {
                    strength: 95,
                    speed: 98,
                    durability: 90,
                    intelligence: 88,
                    auraCapacity: 98,
                    auraControl: 92,
                    experience: 75
                }
            }
        };

        // Initialize sliders
        function initializeSliders() {
            const stats = ['strength', 'speed', 'durability', 'intelligence', 'auraCapacity', 'auraControl', 'experience'];
            
            for (let i = 1; i <= 2; i++) {
                stats.forEach(stat => {
                    const slider = document.getElementById(`f${i}-${stat}`);
                    const display = document.getElementById(`f${i}-${stat}-val`);
                    
                    slider.addEventListener('input', (e) => {
                        display.textContent = e.target.value;
                    });
                });

                // Nen type info update
                document.getElementById(`f${i}-nenType`).addEventListener('change', (e) => {
                    updateNenInfo(i, e.target.value);
                });

                // Initialize nen info
                updateNenInfo(i, document.getElementById(`f${i}-nenType`).value);
            }
        }

        function updateNenInfo(fighter, nenType) {
            const info = NEN_TYPES[nenType];
            const infoDiv = document.getElementById(`f${fighter}-nen-info`);
            infoDiv.innerHTML = `
                <strong>${nenType}:</strong> ${info.description}<br>
                <strong>Advantage vs:</strong> ${info.advantage} | <strong>Weak vs:</strong> ${info.disadvantage}
            `;
        }

        function loadPreset(fighter, presetName) {
            const preset = PRESETS[presetName];
            if (!preset) return;

            document.getElementById(`f${fighter}-id`).value = preset.id;
            document.getElementById(`f${fighter}-name`).value = preset.name;
            document.getElementById(`f${fighter}-nenType`).value = preset.nenType;
            updateNenInfo(fighter, preset.nenType);

            Object.keys(preset.baseStats).forEach(stat => {
                const slider = document.getElementById(`f${fighter}-${stat}`);
                const display = document.getElementById(`f${fighter}-${stat}-val`);
                slider.value = preset.baseStats[stat];
                display.textContent = preset.baseStats[stat];
            });
        }

        function getFighterData(fighter) {
            const stats = ['strength', 'speed', 'durability', 'intelligence', 'auraCapacity', 'auraControl', 'experience'];
            const baseStats = {};
            
            stats.forEach(stat => {
                baseStats[stat] = parseInt(document.getElementById(`f${fighter}-${stat}`).value);
            });

            return {
                id: parseInt(document.getElementById(`f${fighter}-id`).value),
                name: document.getElementById(`f${fighter}-name`).value || `Fighter ${fighter}`,
                nenType: document.getElementById(`f${fighter}-nenType`).value,
                baseStats: baseStats
            };
        }

        function calculateCombatScore(fighter, opponent) {
            const calculations = [];
            
            // Step 1: Calculate base combat metrics
            const offensivePower = (fighter.baseStats.strength * 0.4) + 
                                  (fighter.baseStats.speed * 0.3) + 
                                  (fighter.baseStats.auraCapacity * 0.3);
            
            calculations.push({
                title: "Offensive Power",
                formula: `(Strength × 0.4) + (Speed × 0.3) + (Aura Capacity × 0.3)`,
                calculation: `(${fighter.baseStats.strength} × 0.4) + (${fighter.baseStats.speed} × 0.3) + (${fighter.baseStats.auraCapacity} × 0.3)`,
                result: offensivePower.toFixed(2)
            });

            const defensiveRating = (fighter.baseStats.durability * 0.5) + 
                                   (fighter.baseStats.auraControl * 0.3) + 
                                   (fighter.baseStats.intelligence * 0.2);
            
            calculations.push({
                title: "Defensive Rating",
                formula: `(Durability × 0.5) + (Aura Control × 0.3) + (Intelligence × 0.2)`,
                calculation: `(${fighter.baseStats.durability} × 0.5) + (${fighter.baseStats.auraControl} × 0.3) + (${fighter.baseStats.intelligence} × 0.2)`,
                result: defensiveRating.toFixed(2)
            });

            const tacticalScore = (fighter.baseStats.intelligence * 0.5) + 
                                 (fighter.baseStats.experience * 0.5);
            
            calculations.push({
                title: "Tactical Score",
                formula: `(Intelligence × 0.5) + (Experience × 0.5)`,
                calculation: `(${fighter.baseStats.intelligence} × 0.5) + (${fighter.baseStats.experience} × 0.5)`,
                result: tacticalScore.toFixed(2)
            });

            const auraEfficiency = (fighter.baseStats.auraControl * 0.6) + 
                                  (fighter.baseStats.auraCapacity * 0.4);
            
            calculations.push({
                title: "Aura Efficiency",
                formula: `(Aura Control × 0.6) + (Aura Capacity × 0.4)`,
                calculation: `(${fighter.baseStats.auraControl} × 0.6) + (${fighter.baseStats.auraCapacity} × 0.4)`,
                result: auraEfficiency.toFixed(2)
            });

            // Step 2: Calculate weighted combat score
            const baseCombatScore = (offensivePower * 0.35) + 
                                   (defensiveRating * 0.25) + 
                                   (tacticalScore * 0.25) + 
                                   (auraEfficiency * 0.15);
            
            calculations.push({
                title: "Base Combat Score",
                formula: `(Offensive × 0.35) + (Defensive × 0.25) + (Tactical × 0.25) + (Aura Efficiency × 0.15)`,
                calculation: `(${offensivePower.toFixed(2)} × 0.35) + (${defensiveRating.toFixed(2)} × 0.25) + (${tacticalScore.toFixed(2)} × 0.25) + (${auraEfficiency.toFixed(2)} × 0.15)`,
                result: baseCombatScore.toFixed(2)
            });

            // Step 3: Apply Nen type advantage
            let nenMultiplier = 1.0;
            let nenAdvantage = "None";
            
            const myType = NEN_TYPES[fighter.nenType];
            if (myType.advantage === opponent.nenType) {
                nenMultiplier = 1.15;
                nenAdvantage = `+15% (Advantage over ${opponent.nenType})`;
            } else if (myType.disadvantage === opponent.nenType) {
                nenMultiplier = 0.85;
                nenAdvantage = `-15% (Disadvantage vs ${opponent.nenType})`;
            }

            const finalScore = baseCombatScore * nenMultiplier;

            calculations.push({
                title: "Nen Type Modifier",
                formula: `Base Score × Nen Multiplier`,
                calculation: `${baseCombatScore.toFixed(2)} × ${nenMultiplier}`,
                result: finalScore.toFixed(2),
                advantage: nenAdvantage
            });

            return {
                offensivePower,
                defensiveRating,
                tacticalScore,
                auraEfficiency,
                baseCombatScore,
                nenMultiplier,
                nenAdvantage,
                finalScore,
                calculations
            };
        }

        function simulateFight() {
            const fighter1 = getFighterData(1);
            const fighter2 = getFighterData(2);

            const score1 = calculateCombatScore(fighter1, fighter2);
            const score2 = calculateCombatScore(fighter2, fighter1);

            // Determine winner
            const totalScore = score1.finalScore + score2.finalScore;
            const f1WinProbability = (score1.finalScore / totalScore) * 100;
            const f2WinProbability = (score2.finalScore / totalScore) * 100;

            const winner = score1.finalScore > score2.finalScore ? fighter1 : fighter2;
            const winnerScore = score1.finalScore > score2.finalScore ? score1 : score2;
            const winProbability = score1.finalScore > score2.finalScore ? f1WinProbability : f2WinProbability;

            displayResults(fighter1, fighter2, score1, score2, winner, winProbability);
        }

        function displayResults(fighter1, fighter2, score1, score2, winner, winProbability) {
            const resultsDiv = document.getElementById('results');
            resultsDiv.classList.remove('hidden');

            const nenAdvantageHTML = (score1.nenMultiplier !== 1.0 || score2.nenMultiplier !== 1.0) ? `
                <div class="nen-advantage-display">
                    <h4>⚡ Nen Type Advantage Analysis</h4>
                    <p><strong>${fighter1.name} (${fighter1.nenType}):</strong> ${score1.nenAdvantage}</p>
                    <p><strong>${fighter2.name} (${fighter2.nenType}):</strong> ${score2.nenAdvantage}</p>
                </div>
            ` : '';

            resultsDiv.innerHTML = `
                <div class="winner-announcement">
                    <h2>🏆 Victory Prediction</h2>
                    <div class="winner-name">${winner.name}</div>
                    <div class="win-probability">Win Probability: ${winProbability.toFixed(1)}%</div>
                </div>

                ${nenAdvantageHTML}

                <div class="vs-badge">VS</div>

                <div class="comparison-grid">
                    <div class="score-card ${score1.finalScore > score2.finalScore ? 'winner' : ''}">
                        <h3>${fighter1.name} (ID: ${fighter1.id}) - ${fighter1.nenType}</h3>
                        
                        <div class="score-breakdown">
                            <div class="score-item">
                                <span class="score-label">Offensive Power</span>
                                <span class="score-number">${score1.offensivePower.toFixed(2)}</span>
                            </div>
                            <div class="score-item">
                                <span class="score-label">Defensive Rating</span>
                                <span class="score-number">${score1.defensiveRating.toFixed(2)}</span>
                            </div>
                            <div class="score-item">
                                <span class="score-label">Tactical Score</span>
                                <span class="score-number">${score1.tacticalScore.toFixed(2)}</span>
                            </div>
                            <div class="score-item">
                                <span class="score-label">Aura Efficiency</span>
                                <span class="score-number">${score1.auraEfficiency.toFixed(2)}</span>
                            </div>
                            <div class="score-item">
                                <span class="score-label">Base Combat Score</span>
                                <span class="score-number">${score1.baseCombatScore.toFixed(2)}</span>
                            </div>
                            <div class="score-item">
                                <span class="score-label">Nen Modifier</span>
                                <span class="score-number">×${score1.nenMultiplier}</span>
                            </div>
                        </div>

                        <div class="total-score">${score1.finalScore.toFixed(2)}</div>
                    </div>

                    <div class="score-card ${score2.finalScore > score1.finalScore ? 'winner' : ''}">
                        <h3>${fighter2.name} (ID: ${fighter2.id}) - ${fighter2.nenType}</h3>
                        
                        <div class="score-breakdown">
                            <div class="score-item">
                                <span class="score-label">Offensive Power</span>
                                <span class="score-number">${score2.offensivePower.toFixed(2)}</span>
                            </div>
                            <div class="score-item">
                                <span class="score-label">Defensive Rating</span>
                                <span class="score-number">${score2.defensiveRating.toFixed(2)}</span>
                            </div>
                            <div class="score-item">
                                <span class="score-label">Tactical Score</span>
                                <span class="score-number">${score2.tacticalScore.toFixed(2)}</span>
                            </div>
                            <div class="score-item">
                                <span class="score-label">Aura Efficiency</span>
                                <span class="score-number">${score2.auraEfficiency.toFixed(2)}</span>
                            </div>
                            <div class="score-item">
                                <span class="score-label">Base Combat Score</span>
                                <span class="score-number">${score2.baseCombatScore.toFixed(2)}</span>
                            </div>
                            <div class="score-item">
                                <span class="score-label">Nen Modifier</span>
                                <span class="score-number">×${score2.nenMultiplier}</span>
                            </div>
                        </div>

                        <div class="total-score">${score2.finalScore.toFixed(2)}</div>
                    </div>
                </div>

                <div class="calculation-steps">
                    <h3>📊 Detailed Calculation Breakdown</h3>
                    
                    <h4 style="margin: 30px 0 15px; color: #667eea;">${fighter1.name} (ID: ${fighter1.id}) Calculations:</h4>
                    ${score1.calculations.map(step => `
                        <div class="step">
                            <div class="step-title">${step.title}</div>
                            <div class="step-content">
                                <div class="formula">${step.formula}</div>
                                <p>${step.calculation} = <strong>${step.result}</strong></p>
                                ${step.advantage ? `<p style="color: #ffc107;">Nen Advantage: ${step.advantage}</p>` : ''}
                            </div>
                        </div>
                    `).join('')}

                    <h4 style="margin: 30px 0 15px; color: #f093fb;">${fighter2.name} (ID: ${fighter2.id}) Calculations:</h4>
                    ${score2.calculations.map(step => `
                        <div class="step">
                            <div class="step-title">${step.title}</div>
                            <div class="step-content">
                                <div class="formula">${step.formula}</div>
                                <p>${step.calculation} = <strong>${step.result}</strong></p>
                                ${step.advantage ? `<p style="color: #ffc107;">Nen Advantage: ${step.advantage}</p>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="calculation-steps">
                    <h3>⚔️ Combat Analysis Summary</h3>
                    <div class="step">
                        <div class="step-title">Overall Assessment</div>
                        <div class="step-content">
                            <p><strong>${winner.name}</strong> has a <strong>${winProbability.toFixed(1)}%</strong> chance of victory based on the calculated combat scores.</p>
                            <p style="margin-top: 10px;">The prediction considers all seven combat stats (strength, speed, durability, intelligence, aura capacity, aura control, and experience), weighted appropriately for combat effectiveness, and adjusted for Nen type advantages.</p>
                            <p style="margin-top: 10px;">Score differential: ${Math.abs(score1.finalScore - score2.finalScore).toFixed(2)} points</p>
                        </div>
                    </div>
                </div>
            `;

            // Scroll to results
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function resetFighters() {
            ['strength', 'speed', 'durability', 'intelligence', 'auraCapacity', 'auraControl', 'experience'].forEach(stat => {
                for (let i = 1; i <= 2; i++) {
                    document.getElementById(`f${i}-${stat}`).value = 50;
                    document.getElementById(`f${i}-${stat}-val`).textContent = 50;
                }
            });

            document.getElementById('f1-id').value = 1;
            document.getElementById('f2-id').value = 2;
            document.getElementById('f1-name').value = 'Gon';
            document.getElementById('f2-name').value = 'Hisoka';
            document.getElementById('f1-nenType').value = 'Enhancer';
            document.getElementById('f2-nenType').value = 'Transmuter';
            
            updateNenInfo(1, 'Enhancer');
            updateNenInfo(2, 'Transmuter');

            document.getElementById('results').classList.add('hidden');
        }

        // Initialize on load
        window.addEventListener('load', () => {
            initializeSliders();
            loadPreset(1, 'gon');
            loadPreset(2, 'hisoka');
        });