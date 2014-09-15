﻿#region License Header

// /*******************************************************************************
//  * Open Behavioral Health Information Technology Architecture (OBHITA.org)
//  * 
//  * Redistribution and use in source and binary forms, with or without
//  * modification, are permitted provided that the following conditions are met:
//  *     * Redistributions of source code must retain the above copyright
//  *       notice, this list of conditions and the following disclaimer.
//  *     * Redistributions in binary form must reproduce the above copyright
//  *       notice, this list of conditions and the following disclaimer in the
//  *       documentation and/or other materials provided with the distribution.
//  *     * Neither the name of the <organization> nor the
//  *       names of its contributors may be used to endorse or promote products
//  *       derived from this software without specific prior written permission.
//  * 
//  * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
//  * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
//  * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
//  * DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
//  * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
//  * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
//  * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
//  * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//  * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
//  * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//  ******************************************************************************/

#endregion

namespace ProCenter.Domain.Nida
{
    #region Using Statements

    using ProCenter.Domain.AssessmentModule;
    using ProCenter.Domain.AssessmentModule.Attributes;

    #endregion

    /// <summary>The drug use frequency group class.</summary>
    public class DrugUseFrequencyGroup : Group
    {
        #region Constructors and Destructors

        /// <summary>Initializes a new instance of the <see cref="DrugUseFrequencyGroup" /> class.</summary>
        /// <param name="assessmentInstance">The assessment instance.</param>
        public DrugUseFrequencyGroup ( AssessmentInstance assessmentInstance )
            : base ( assessmentInstance )
        {
        }

        #endregion

        #region Public Properties

        /// <summary>Gets or sets the substance abuse illicit substance marijuana personal medical history frequency.</summary>
        /// <value>
        ///     The substance abuse illicit substance marijuana personal medical history frequency.
        /// </value>
        [Code ( "3269979" )]
        [ValueType ( typeof(NidaValueType), NidaValueType.FrequencyCode )]
        [IsRequired]
        [DisplayOrder ( 0 )]
        public DrugUseFrequency SubstanceAbuseIllicitSubstanceMarijuanaPersonalMedicalHistoryFrequency { get; protected set; }

        /// <summary>Gets or sets the substance abuse illicit substance opioid personal medical history frequency.</summary>
        /// <value>
        ///     The substance abuse illicit substance opioid personal medical history frequency.
        /// </value>
        [Code ( "3269981" )]
        [ValueType ( typeof(NidaValueType), NidaValueType.FrequencyCode )]
        [IsRequired]
        [DisplayOrder ( 2 )]
        public DrugUseFrequency SubstanceAbuseIllicitSubstanceOpioidPersonalMedicalHistoryFrequency { get; protected set; }

        /// <summary>Gets or sets the substance abuse illicit substance other substanceof abuse personal medical history frequency.</summary>
        /// <value>
        ///     The substance abuse illicit substance other substanceof abuse personal medical history frequency.
        /// </value>
        [Code ( "3269984" )]
        [ValueType ( typeof(NidaValueType), NidaValueType.FrequencyCode )]
        [IsRequired]
        [DisplayOrder ( 6 )]
        public DrugUseFrequency SubstanceAbuseIllicitSubstanceOtherSubstanceofAbusePersonalMedicalHistoryFrequency { get; protected set; }

        /// <summary>Gets or sets the substance abuse illicit substance other substanceof abuse personal medical history specify.</summary>
        /// <value>
        ///     The substance abuse illicit substance other substanceof abuse personal medical history specify.
        /// </value>
        [Code ( "3269985" )]
        [ValueType ( typeof(NidaValueType), NidaValueType.FrequencyCode )]
        [DisplayOrder ( 5 )]
        public string SubstanceAbuseIllicitSubstanceOtherSubstanceofAbusePersonalMedicalHistorySpecify { get; protected set; }

        /// <summary>Gets or sets the substance abuse illicit substance sedative personal medical history frequency.</summary>
        /// <value>
        ///     The substance abuse illicit substance sedative personal medical history frequency.
        /// </value>
        [Code ( "3269983" )]
        [ValueType ( typeof(NidaValueType), NidaValueType.FrequencyCode )]
        [IsRequired]
        [DisplayOrder ( 4 )]
        public DrugUseFrequency SubstanceAbuseIllicitSubstanceSedativePersonalMedicalHistoryFrequency { get; protected set; }

        /// <summary>Gets or sets the substance abuse illicit substance stimulant personal medical history frequency.</summary>
        /// <value>
        ///     The substance abuse illicit substance stimulant personal medical history frequency.
        /// </value>
        [Code ( "3269982" )]
        [ValueType ( typeof(NidaValueType), NidaValueType.FrequencyCode )]
        [IsRequired]
        [DisplayOrder ( 3 )]
        public DrugUseFrequency SubstanceAbuseIllicitSubstanceStimulantPersonalMedicalHistoryFrequency { get; protected set; }

        /// <summary>Gets or sets the substance abuse illicit substance cocaine personal medical history frequency.</summary>
        /// <value>
        ///     The substance abuse illicit substance cocaine personal medical history frequency.
        /// </value>
        [Code ( "3269980" )]
        [ValueType ( typeof(NidaValueType), NidaValueType.FrequencyCode )]
        [IsRequired]
        [DisplayOrder ( 1 )]
        public DrugUseFrequency SubstanceAbuseIllicitSubstanceCocainePersonalMedicalHistoryFrequency { get; protected set; }

        #endregion
    }
}