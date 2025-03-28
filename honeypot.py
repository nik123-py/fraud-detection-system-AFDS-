import datetime
import uuid
import json
import logging
import random
import numpy as np
from typing import Dict, List, Any, Optional
from collections import defaultdict, Counter

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='honeypot_activity.log'
)

class AITransactionHoneypot:
    def __init__(self):
        self.accounts = {}
        self.transactions = []
        self.sessions = {}
        self.suspicious_activities = []
        self.fraud_patterns = self._load_fraud_patterns()
        self.behavioral_features = {}
        self.known_fraudster_profiles = self._load_fraudster_profiles()
        self.global_behavior_history = []
        
    def _load_fraud_patterns(self) -> List[Dict[str, Any]]:
        """Load known fraud patterns from configuration."""
        return [
            {
                "pattern_id": "p001",
                "pattern_type": "rapid_withdrawal",
                "description": "Multiple withdrawals in short timeframe",
                "threshold": 3,
                "timeframe_seconds": 300,
                "confidence": 0.85
            },
            {
                "pattern_id": "p002",
                "pattern_type": "account_draining",
                "description": "Attempting to withdraw >90% of funds",
                "threshold": 0.9,
                "confidence": 0.92
            },
            {
                "pattern_id": "p003",
                "pattern_type": "unusual_access_pattern",
                "description": "Access from unusual location or device",
                "score_threshold": 0.8,
                "confidence": 0.81
            }
        ]
    
    def _load_fraudster_profiles(self) -> List[Dict[str, Any]]:
        """Load known fraudster behavioral profiles."""
        return [
            {
                "profile_id": "fp001",
                "name": "Quick Drainer",
                "description": "Checks balance then immediately withdraws maximum amount",
                "key_actions": ["check_balance", "withdrawal"],
                "timing_pattern": "rapid",
                "behavioral_markers": {
                    "min_actions_before_withdrawal": 1,
                    "max_actions_before_withdrawal": 3,
                    "withdrawal_to_balance_ratio": 0.9
                },
                "confidence": 0.88
            },
            {
                "profile_id": "fp002",
                "name": "Information Gatherer",
                "description": "Explores many account pages gathering info before acting",
                "key_actions": ["view_account_details", "view_transaction_history", "check_balance"],
                "timing_pattern": "methodical",
                "behavioral_markers": {
                    "min_info_pages_viewed": 3,
                    "navigation_pattern": "breadth-first"
                },
                "confidence": 0.72
            },
            {
                "profile_id": "fp003",
                "name": "Social Engineer",
                "description": "Attempts to use personal information to change account details",
                "key_actions": ["view_profile", "update_contact_info", "password_reset_attempt"],
                "timing_pattern": "patient",
                "behavioral_markers": {
                    "contact_update_attempts": True,
                    "password_reset_frequency": "high"
                },
                "confidence": 0.85
            }
        ]
        
    def create_honeypot_account(self, initial_balance: float = 10000.00, account_type: str = "checking") -> Dict[str, Any]:
        """Create a new honeypot account with tracking capabilities."""
        account_id = str(uuid.uuid4())
        account = {
            "account_id": account_id,
            "account_number": f"HONEYPOT-{account_id[:8].upper()}",
            "account_type": account_type,
            "balance": initial_balance,
            "created_at": datetime.datetime.now(),
            "is_honeypot": True,
            "activity_log": [],
            "behavioral_fingerprint": {
                "normal_access_times": self._generate_normal_access_pattern(),
                "normal_transaction_amounts": self._generate_normal_transaction_pattern(account_type),
                "typical_locations": self._generate_typical_locations()
            }
        }
        self.accounts[account_id] = account
        logging.info(f"Created honeypot account {account['account_number']} with balance ${initial_balance}")
        return account
    
    def _generate_normal_access_pattern(self) -> Dict[str, Any]:
        """Generate a realistic access pattern for the honeypot account."""
        business_hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
        evening_hours = [18, 19, 20, 21, 22]
        
        # Simulate a preference for business hours with some evening access
        hour_weights = {hour: 10 for hour in business_hours}
        hour_weights.update({hour: 5 for hour in evening_hours})
        hour_weights.update({hour: 1 for hour in range(23) if hour not in business_hours and hour not in evening_hours})
        
        return {
            "preferred_hours": hour_weights,
            "preferred_days": {"weekday": 0.8, "weekend": 0.2},
            "session_duration": {"mean": 12.5, "std": 5.2}
        }
    
    def _generate_normal_transaction_pattern(self, account_type: str) -> Dict[str, Any]:
        """Generate realistic transaction patterns based on account type."""
        if account_type == "checking":
            return {
                "deposits": {"frequency": "bi-weekly", "mean_amount": 2200, "std_amount": 300},
                "withdrawals": {"frequency": "weekly", "mean_amount": 340, "std_amount": 150, "max_single_amount": 1000},
                "transfers": {"frequency": "monthly", "mean_amount": 1500, "std_amount": 500}
            }
        elif account_type == "savings":
            return {
                "deposits": {"frequency": "monthly", "mean_amount": 1500, "std_amount": 500},
                "withdrawals": {"frequency": "quarterly", "mean_amount": 2000, "std_amount": 1000, "max_single_amount": 5000},
                "transfers": {"frequency": "monthly", "mean_amount": 500, "std_amount": 200}
            }
        else:  # investment or other
            return {
                "deposits": {"frequency": "quarterly", "mean_amount": 5000, "std_amount": 2000},
                "withdrawals": {"frequency": "annually", "mean_amount": 10000, "std_amount": 5000, "max_single_amount": 25000},
                "transfers": {"frequency": "semi-annually", "mean_amount": 3000, "std_amount": 1000}
            }
    
    def _generate_typical_locations(self) -> List[Dict[str, Any]]:
        """Generate typical access locations for the honeypot account."""
        return [
            {"city": "New York", "state": "NY", "country": "US", "frequency": 0.7},
            {"city": "Boston", "state": "MA", "country": "US", "frequency": 0.2},
            {"city": "Chicago", "state": "IL", "country": "US", "frequency": 0.1}
        ]
    
    def start_session(self, ip_address: str, user_agent: str, geolocation: Optional[Dict] = None) -> str:
        """Start a new tracking session for a visitor."""
        session_id = str(uuid.uuid4())
        timestamp = datetime.datetime.now()
        
        # Extract device information from user agent
        device_info = self._parse_user_agent(user_agent)
        
        session = {
            "session_id": session_id,
            "ip_address": ip_address,
            "user_agent": user_agent,
            "device_info": device_info,
            "geolocation": geolocation or {},
            "start_time": timestamp,
            "interactions": [],
            "risk_score": 0.0,
            "behavioral_features": {
                "action_timings": [],
                "page_view_durations": {},
                "navigation_path": [],
                "transaction_amounts": []
            },
            "profile_matches": []
        }
        
        self.sessions[session_id] = session
        logging.info(f"New session started: {session_id} from IP {ip_address}")
        return session_id
    
    def _parse_user_agent(self, user_agent: str) -> Dict[str, str]:
        """Extract device and browser information from user agent string."""
        device_info = {"raw": user_agent}
        
        # Simple parsing logic
        if "Windows" in user_agent:
            device_info["os"] = "Windows"
        elif "Mac" in user_agent:
            device_info["os"] = "MacOS"
        elif "Android" in user_agent:
            device_info["os"] = "Android"
        elif "iPhone" in user_agent or "iPad" in user_agent:
            device_info["os"] = "iOS"
        else:
            device_info["os"] = "Unknown"
            
        if "Chrome" in user_agent:
            device_info["browser"] = "Chrome"
        elif "Firefox" in user_agent:
            device_info["browser"] = "Firefox"
        elif "Safari" in user_agent:
            device_info["browser"] = "Safari"
        elif "Edge" in user_agent:
            device_info["browser"] = "Edge"
        else:
            device_info["browser"] = "Unknown"
            
        return device_info
    
    def log_interaction(self, session_id: str, action: str, details: Dict[str, Any]) -> None:
        """Log an interaction within a session and update behavioral models."""
        if session_id not in self.sessions:
            logging.warning(f"Attempted to log interaction for unknown session: {session_id}")
            return
            
        timestamp = datetime.datetime.now()
        session = self.sessions[session_id]
        
        # Calculate time since last action (if any)
        time_since_last_action = None
        if session["interactions"]:
            last_action_time = session["interactions"][-1]["timestamp"]
            time_since_last_action = (timestamp - last_action_time).total_seconds()
        
        interaction = {
            "timestamp": timestamp,
            "action": action,
            "details": details,
            "time_since_last_action": time_since_last_action
        }
        
        session["interactions"].append(interaction)
        
        # Update behavioral features
        self._update_behavioral_features(session_id, action, details, time_since_last_action)
        
        # Also log to account if an account_id is provided
        if "account_id" in details and details["account_id"] in self.accounts:
            self.accounts[details["account_id"]]["activity_log"].append(interaction)
            
        logging.info(f"Session {session_id}: {action} - {json.dumps(details)}")
        
        # Check for suspicious patterns and match against fraudster profiles
        self._analyze_session(session_id)
    
    def _update_behavioral_features(self, session_id: str, action: str, details: Dict[str, Any], 
                                   time_since_last_action: Optional[float]) -> None:
        """Update the behavioral features for the session based on the current interaction."""
        session = self.sessions[session_id]
        
        # Track navigation path
        session["behavioral_features"]["navigation_path"].append(action)
        
        # Track timing between actions
        if time_since_last_action is not None:
            session["behavioral_features"]["action_timings"].append(time_since_last_action)
        
        # Track page view durations
        if action.startswith("VIEW_") and time_since_last_action is not None:
            page_type = action[5:]  # Remove "VIEW_" prefix
            if session["behavioral_features"]["navigation_path"][-2].startswith("VIEW_"):
                previous_page = session["behavioral_features"]["navigation_path"][-2][5:]
                if previous_page not in session["behavioral_features"]["page_view_durations"]:
                    session["behavioral_features"]["page_view_durations"][previous_page] = []
                session["behavioral_features"]["page_view_durations"][previous_page].append(time_since_last_action)
        
        # Track transaction amounts
        if action.startswith("TRANSACTION_") and "amount" in details:
            session["behavioral_features"]["transaction_amounts"].append(details["amount"])
    
    def _analyze_session(self, session_id: str) -> None:
        """Analyze session for suspicious activity and match against profiles."""
        session = self.sessions[session_id]
        
        # Skip if not enough interactions
        if len(session["interactions"]) < 3:
            return
            
        # Extract behavioral features
        features = self._extract_behavioral_features(session)
        
        # Store in behavioral features database for this session
        self.behavioral_features[session_id] = features
        
        # Calculate risk score
        risk_score = self._calculate_session_risk(session_id, features)
        session["risk_score"] = risk_score
        
        # Add to global behavior history
        behavior_record = {
            "timestamp": datetime.datetime.now(),
            "session_id": session_id,
            "features": features,
            "risk_score": risk_score
        }
        self.global_behavior_history.append(behavior_record)
        
        # Match against fraudster profiles
        self._match_against_fraudster_profiles(session_id, features)
        
        # Every 10 new sessions, run pattern discovery to find new fraud patterns
        if len(self.global_behavior_history) % 10 == 0:
            self._discover_new_patterns()
    
    def _extract_behavioral_features(self, session: Dict[str, Any]) -> Dict[str, Any]:
        """Extract normalized behavioral features from session data."""
        features = {}
        session_id = session["session_id"]
        
        # Timing features
        action_timings = session["behavioral_features"]["action_timings"]
        if action_timings:
            features["avg_time_between_actions"] = sum(action_timings) / len(action_timings)
            features["max_time_between_actions"] = max(action_timings) if action_timings else 0
            features["min_time_between_actions"] = min(action_timings) if action_timings else 0
            features["std_time_between_actions"] = np.std(action_timings) if len(action_timings) > 1 else 0
        
        # Navigation features
        nav_path = session["behavioral_features"]["navigation_path"]
        features["action_count"] = len(nav_path)
        if nav_path:
            action_counts = Counter(nav_path)
            features["unique_action_ratio"] = len(action_counts) / len(nav_path)
            features["most_common_action"] = action_counts.most_common(1)[0][0] if action_counts else None
            features["session_id"] = session_id
            
            # Check for common fraud-related sequences
            view_withdraw_sequence = [i for i in range(len(nav_path)-1) 
                                     if nav_path[i].startswith("VIEW") and nav_path[i+1].startswith("TRANSACTION_WITHDRAWAL")]
            features["view_withdraw_transitions"] = len(view_withdraw_sequence)
        
        # Transaction features
        transaction_amounts = session["behavioral_features"]["transaction_amounts"]
        if transaction_amounts:
            features["avg_transaction_amount"] = sum(transaction_amounts) / len(transaction_amounts)
            features["max_transaction_amount"] = max(transaction_amounts)
            features["total_transaction_amount"] = sum(transaction_amounts)
            features["transaction_count"] = len(transaction_amounts)
        
        # Session duration
        if session["interactions"]:
            session_duration = (datetime.datetime.now() - session["start_time"]).total_seconds()
            features["session_duration"] = session_duration
            
            if features.get("action_count", 0) > 0:
                features["actions_per_minute"] = features["action_count"] / (session_duration / 60)
        
        return features
    
    def _calculate_session_risk(self, session_id: str, features: Dict[str, Any]) -> float:
        """Calculate risk score for a session based on behavioral features."""
        risk_score = 0.0
        session = self.sessions[session_id]
        
        # Check for rapid actions
        if features.get("avg_time_between_actions", 60) < 10:
            risk_score += 0.2
        
        # Check for many transactions in short time
        if features.get("transaction_count", 0) > 2:
            if features.get("session_duration", 3600) < 300:  # Less than 5 minutes
                risk_score += 0.3
        
        # Check for large withdrawals
        if features.get("max_transaction_amount", 0) > 5000:
            risk_score += 0.2
        
        # Check for view-then-withdraw pattern
        if features.get("view_withdraw_transitions", 0) > 2:
            risk_score += 0.2
        
        # Check unusual navigation patterns
        if features.get("action_count", 0) > 10 and features.get("unique_action_ratio", 1) < 0.3:
            # Repetitive behaviors
            risk_score += 0.1
        
        return risk_score
    
    def _match_against_fraudster_profiles(self, session_id: str, features: Dict[str, Any]) -> None:
        """Match current session behavior against known fraudster profiles."""
        session = self.sessions[session_id]
        
        # Clear previous matches
        session["profile_matches"] = []
        
        # Compare against each profile
        for profile in self.known_fraudster_profiles:
            match_score = self._calculate_profile_match_score(features, profile)
            
            if match_score > 0.6:  # Threshold for considering a match
                profile_match = {
                    "profile_id": profile["profile_id"],
                    "profile_name": profile["name"],
                    "match_score": match_score,
                    "timestamp": datetime.datetime.now()
                }
                session["profile_matches"].append(profile_match)
                
                # Log if this is a high match
                if match_score > 0.8:
                    logging.warning(
                        f"High profile match: Session {session_id} matches '{profile['name']}' "
                        f"with score {match_score:.2f}"
                    )
    
    def _calculate_profile_match_score(self, features: Dict[str, Any], profile: Dict[str, Any]) -> float:
        """Calculate how well the current behavioral features match a fraudster profile."""
        session_id = features.get("session_id", "")
        if not session_id or session_id not in self.sessions:
            return 0.0
            
        nav_path = self.sessions[session_id]["behavioral_features"]["navigation_path"]
        
        # Check key actions overlap
        profile_key_actions = set(profile["key_actions"])
        session_actions = set(nav_path)
        action_overlap = len(profile_key_actions.intersection(session_actions)) / len(profile_key_actions) if profile_key_actions else 0
        
        # Check timing pattern
        timing_score = 0
        if profile["timing_pattern"] == "rapid" and features.get("avg_time_between_actions", 60) < 20:
            timing_score = 0.9
        elif profile["timing_pattern"] == "methodical" and 30 <= features.get("avg_time_between_actions", 0) <= 90:
            timing_score = 0.9
        elif profile["timing_pattern"] == "patient" and features.get("avg_time_between_actions", 0) > 60:
            timing_score = 0.9
        
        # Check specific behavioral markers
        markers_score = 0
        markers = profile["behavioral_markers"]
        
        if profile["name"] == "Quick Drainer":
            # Check withdrawal patterns
            if features.get("view_withdraw_transitions", 0) > 0:
                markers_score += 0.5
                
            # Check withdrawal size
            if features.get("max_transaction_amount", 0) / 10000 >= markers.get("withdrawal_to_balance_ratio", 0.9):
                markers_score += 0.5
                
        elif profile["name"] == "Information Gatherer":
            # Check for information page views
            info_pages_viewed = sum(1 for action in nav_path if action.startswith("VIEW_"))
            if info_pages_viewed >= markers.get("min_info_pages_viewed", 3):
                markers_score += 1.0
                
        elif profile["name"] == "Social Engineer":
            # Check for profile/security related actions
            social_actions = sum(1 for action in nav_path 
                               if action in ["UPDATE_CONTACT_INFO", "PASSWORD_RESET_ATTEMPT", "VIEW_SECURITY_QUESTIONS"])
            if social_actions >= 2:
                markers_score += 1.0
        
        # Calculate final weighted score
        weights = [0.3, 0.3, 0.4]  # Action match, timing, markers
        return action_overlap * weights[0] + timing_score * weights[1] + markers_score * weights[2]
    
    def process_transaction(self, session_id: str, transaction_type: str, 
                           amount: float, source_account: str, 
                           destination_account: Optional[str] = None) -> Dict[str, Any]:
        """Process a transaction and track it for suspicious activity."""
        timestamp = datetime.datetime.now()
        transaction_id = str(uuid.uuid4())
        
        transaction = {
            "transaction_id": transaction_id,
            "session_id": session_id,
            "timestamp": timestamp,
            "transaction_type": transaction_type,
            "amount": amount,
            "source_account": source_account,
            "destination_account": destination_account,
            "status": "pending",
            "risk_level": "unknown"
        }
        
        self.transactions.append(transaction)
        
        # Log the interaction
        self.log_interaction(session_id, f"TRANSACTION_{transaction_type.upper()}", {
            "transaction_id": transaction_id,
            "account_id": source_account,
            "amount": amount,
            "destination": destination_account
        })
        
        # Perform real-time risk assessment
        risk_result = self._assess_transaction_risk(transaction)
        transaction["risk_level"] = risk_result["risk_level"]
        transaction["risk_factors"] = risk_result["risk_factors"]
        
        # Apply dynamic response based on risk level
        self._apply_dynamic_response(transaction, risk_result)
        
        return transaction
    
    def _assess_transaction_risk(self, transaction: Dict[str, Any]) -> Dict[str, Any]:
        """Perform real-time risk assessment of the transaction."""
        session_id = transaction["session_id"]
        session = self.sessions.get(session_id)
        
        if not session:
            return {"risk_level": "high", "risk_factors": ["unknown_session"], "score": 0.9}
        
        risk_factors = []
        risk_score = 0.0
        
        # Check amount against account norms
        if transaction["source_account"] in self.accounts:
            account = self.accounts[transaction["source_account"]]
            normal_patterns = account["behavioral_fingerprint"]["normal_transaction_amounts"]
            
            if transaction["transaction_type"] == "withdrawal":
                normal_mean = normal_patterns["withdrawals"]["mean_amount"]
                normal_std = normal_patterns["withdrawals"]["std_amount"]
                max_amount = normal_patterns["withdrawals"]["max_single_amount"]
                
                # Check if amount is abnormally high
                if transaction["amount"] > max_amount:
                    risk_factors.append("exceeds_max_withdrawal")
                    risk_score += 0.3
                
                # Check if amount is statistically unusual (> 2 standard deviations)
                if transaction["amount"] > normal_mean + 2 * normal_std:
                    risk_factors.append("statistically_unusual_amount")
                    risk_score += 0.2
        
        # Check session behavior
        if session["risk_score"] > 0.7:
            risk_factors.append("high_risk_session")
            risk_score += 0.25
        
        # Check for matched fraudster profiles
        if any(match["match_score"] > 0.7 for match in session["profile_matches"]):
            risk_factors.append("matches_known_fraudster_profile")
            risk_score += 0.25
        
        # Determine risk level
        if risk_score > 0.8:
            risk_level = "critical"
        elif risk_score > 0.6:
            risk_level = "high"
        elif risk_score > 0.4:
            risk_level = "medium"
        elif risk_score > 0.2:
            risk_level = "low"
        else:
            risk_level = "minimal"
        
        return {
            "risk_level": risk_level,
            "risk_factors": risk_factors,
            "score": risk_score
        }
    
    def _apply_dynamic_response(self, transaction: Dict[str, Any], risk_result: Dict[str, Any]) -> None:
        """Apply a dynamic response based on the risk assessment."""
        risk_level = risk_result["risk_level"]
        
        if risk_level == "critical":
            transaction["status"] = "blocked"
            self._flag_suspicious_activity(
                session_id=transaction["session_id"],
                pattern_type="critical_risk_transaction",
                severity="critical",
                evidence=risk_result
            )
            logging.critical(f"TRANSACTION BLOCKED: {transaction['transaction_id']}")
        elif risk_level == "high":
            transaction["status"] = "delayed"
            self._flag_suspicious_activity(
                session_id=transaction["session_id"],
                pattern_type="high_risk_transaction",
                severity="high",
                evidence=risk_result
            )
            logging.warning(f"TRANSACTION DELAYED: {transaction['transaction_id']}")
        elif risk_level == "medium":
            transaction["status"] = "flagged"
            self._flag_suspicious_activity(
                session_id=transaction["session_id"],
                pattern_type="suspicious_transaction",
                severity="medium",
                evidence=risk_result
            )
            logging.info(f"TRANSACTION FLAGGED: {transaction['transaction_id']}")
        else:
            transaction["status"] = "approved"
            logging.info(f"TRANSACTION APPROVED: {transaction['transaction_id']}")

    def _flag_suspicious_activity(self, session_id: str, pattern_type: str,
                                 severity: str, evidence: Dict[str, Any]) -> None:
        """Record suspicious activity in the monitoring system."""
        activity_id = str(uuid.uuid4())
        self.suspicious_activities.append({
            "activity_id": activity_id,
            "session_id": session_id,
            "timestamp": datetime.datetime.now(),
            "pattern_type": pattern_type,
            "severity": severity,
            "evidence": evidence
        })

    def _discover_new_patterns(self) -> None:
        """Analyze recent behavior to find emerging fraud patterns."""
        recent_behaviors = self.global_behavior_history[-10:]
        
        # Look for clusters of high-risk sessions
        high_risk_sessions = [b for b in recent_behaviors if b["risk_score"] > 0.7]
        
        if len(high_risk_sessions) >= 3:
            new_pattern = {
                "pattern_id": f"np{len(self.fraud_patterns)+1}",
                "pattern_type": "emerging_cluster",
                "description": f"New cluster of {len(high_risk_sessions)} high-risk sessions",
                "confidence": len(high_risk_sessions)/10,
                "detection_count": len(high_risk_sessions),
                "last_modified": datetime.datetime.now()
            }
            self.fraud_patterns.append(new_pattern)
            logging.info(f"Discovered new potential fraud pattern: {new_pattern['pattern_id']}")
